import db from "../Configuration/Cofig.js";
// import jwt from 'jsonwebtoken'

const baseURL = "http://localhost:5000"

// const validateCategoryName = (category_name) => {
//     if (!category_name || typeof category_name !== "string" || category_name.trim().length == 0) {
//         return ('category name is required and should be a valid string')
//     }
//     return null;
// }

// add Category 

function addCategory(req, res) {
    console.log("add category function has been called");
    const { category_name } = req.body;

    console.log("Category Name:", category_name); 

    if (!category_name || category_name.trim() === "") {
        return res.status(400).send({ success: false, message: "Category name is required!" });
    }

    const category_image = req.file ? req.file.filename : null;
    const query = 'INSERT INTO category (category_name, category_image) VALUES (?, ?)';

    db.query(query, [category_name, category_image], (error, result) => {
        if (error) {
            return res.status(500).send({ success: false, message: error.message });
        }
        res.status(200).send({ success: true, message: "Category added successfully!" });
    });
}


// get all Categories 

function getAllCategories(req, res) {
    try {
        const q4 = "select * from category;"
        db.query(q4, (error, result) => {
            if (error) throw error.message
            if (result.affectedRows == 0) {
                res.status(200).send({ success: false, message: 'No Categories Found' })

            }

            const categories = result.map((c) => ({
                ...c,
                categoryImage: c.category_image ?
                    `${baseURL}/uploads/${c.category_image}`
                    : null
            }))


            res.status(200).send({ success: true, categoriesResult: result , categories: categories })
        })
    } catch (error) {
        res.status(400).send({ success: false, message: error.message })
    }
}

// delete categories 

function deleteCategory(req, res) {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ success: false, message: "Category ID is required" });
    }
    const q2 = "DELETE FROM category WHERE category_id = ?;";
    try {
        db.query(q2, [id], (error, result) => {
            if (error) {
                res.status(200).send({ success: false, message: error.message })

            }

            if (!id || isNaN(id)) {
                return res.status(400).send({ msg: "Invalid brand ID", success: false });
              }
          

            if (result.affectedRows === 0) {
                return res.status(404).send({ success: false, message: "Category not found or already deleted" });
            }

            res.status(200).send({ success: true, message: "Category deleted successfully" });
        });
    } catch (error) {
        res.status(400).send({ success: false, message: error.message })

    }
}


function updateCategory(req, res) {
    const id = req.params.id
    const { category_name } = req.body

    if (!category_name || category_name.trim() === "") {
        return res.status(400).send({ success: false, message: "category_name is required!" });
      }
      const category_image = req.file ? req.file.filename : null;
      console.log("category_image in the updateImage controller",category_image);
      let q3 ;
      let params;
      if(category_image){
        q3 = "UPDATE category SET category_name = ? , category_image = ? WHERE category_id = ?";
        params = [category_name,category_image, id]
      }else{
        q3 = "UPDATE category SET category_name = ?  WHERE category_id = ?";
        params = [category_name, id]
    
      }

    //const  q3 = 'update category set category_name= ?  where  category_id = ? ;'
    try {
        db.query(q3,params, (error, result) => {
            if (error) throw error.message
            if (result.affectedRows == 0) {
                res.status(400).send({ success: false, message: "category fail to update " })
            } else {
                res.status(200).send({ success: true, message: "category Update successfully" })
            }
        })
    } catch (error) {
        res.status(400).send({ success: false, error: error.message })

    }
}


function getOneCategory(req,res){
    const category_id = req.params.category_id
    const q4='select * from category where category_id = ?'
    try {
        db.query(q4,[category_id],(error,result)=>{
            if (error) throw error.message
            if (result.affectedRows == 0) {
                res.status(400).send({ success: false, message: "category Not Found " })
            } else {
                res.status(200).send({ success: true, category : result[0] })
            }
        })
    } catch (error) {
        res.status(400).send({ success: false, error: error.message })
        
    }
}



export default {
    addCategory,
    deleteCategory,
    updateCategory,
    getAllCategories,
    getOneCategory
}