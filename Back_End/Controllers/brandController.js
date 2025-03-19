import db from "../Configuration/Cofig.js";
const baseURL = "http://localhost:5000";

function addBrand(req, res) {
  const { brand_name } = req.body;
  if (!brand_name || brand_name.trim() === "") {
    return res.status(400).send({ success: false, message: "Brand name is required!" });
  }

  const brand_image = req.file ? req.file.filename : null;
  const q1 = "INSERT INTO brand (brand_name, brand_image) VALUES (?, ?);";
  
  db.query(q1, [brand_name, brand_image], (error, result) => {
    if (error) {
      return res.status(500).send({ success: false, message: error.message });
    }
    res.status(201).send({ success: true, message: "Brand added successfully!" });
  });
}

function getAllBrand(req, res) {
  const q2 = "SELECT * FROM brand";
  
  db.query(q2, (error, result) => {
    if (error) {
      return res.status(500).send({ success: false, error: error.message });
    }
    if (result.length === 0) {
      return res.status(404).send({ success: false, message: "No brands found" });
    }
    
    const brands = result.map((b) => ({
      ...b,
      brandImage: b.brand_image ? `${baseURL}/uploads/${b.brand_image}` : null
    }));

    res.status(200).send({ success: true, brands });
  });
}

function deleteBrand(req, res) {
  const id = req.params.id;
  if (!id) {
    return res.status(400).send({ success: false, message: "Brand ID is required" });
  }

  const q3 = "DELETE FROM brand WHERE brand_id = ?;";
  db.query(q3, [id], (error, result) => {
    if (error) {
      return res.status(500).send({ success: false, message: error.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ success: false, message: "Brand not found or already deleted" });
    }
    res.status(200).send({ success: true, message: "Brand deleted successfully!" });
  });
}

function updateBrand(req, res) {
  const id = req.params.id;
  const { brand_name } = req.body;

  if (!brand_name || brand_name.trim() === "") {
    return res.status(400).send({ success: false, message: "Brand name is required!" });
  }
  const brand_image = req.file ? req.file.filename : null;
  console.log("brand_image in the updateImage controller",brand_image);
  let q4 ;
  let params;
  if(brand_image){
    q4 = "UPDATE brand SET brand_name = ? , brand_image = ? WHERE brand_id = ?";
    params = [brand_name,brand_image, id]
  }else{
    q4 = "UPDATE brand SET brand_name = ?  WHERE brand_id = ?";
    params = [brand_name, id]

  }
  db.query(q4,params , (error, result) => {
    if (error) {
      return res.status(500).send({ success: false, message: error.message });
    }
    res.status(200).send({ success: true, message: `Brand '${brand_name}' updated successfully` });
  });
}


function getOneBrand(req,res){
  const brand_id = req.params.brand_id
  const q5='select * from brand where brand_id = ?'
  try {
      db.query(q5,[brand_id],(error,result)=>{
          if (error) throw error.message
          if (result.affectedRows == 0) {
              res.status(400).send({ success: false, message: "Brand Not Found " })
          } else {
              res.status(200).send({ success: true, brand : result[0] })
          }
      })
  } catch (error) {
      res.status(400).send({ success: false, error: error.message })
      
  }
}


export default { getOneBrand,addBrand, getAllBrand, deleteBrand, updateBrand };
