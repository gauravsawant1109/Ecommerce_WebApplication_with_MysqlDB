import db from "../Configuration/Cofig.js";
import jwt from 'jsonwebtoken'

function login(req, res) {
    const {email,password} = req.body;
    const query1 = "SELECT * FROM user WHERE email = ? AND password = ?";
    try {
        db.query(query1, [email,password], (error, result) => {
            if (error) throw error.message
            console.log("result ",result[0]);
            const payload = {id:result[0].id,role:result[0].role};
            console.log("user data from database",payload);
            const token = jwt.sign(payload,'batch40',{expiresIn:'1h'})
            console.log("token :" , token);
            
                res.status(200).send({ success: true,token: token , message : 'Login successfull'});
          
        });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).send({ success: false, message: "Internal server error" });
    }
}

function registration(req, res) {
    const { name, email, password,role } = req.body; 
    const query2 = "INSERT INTO user (name, email, password, role) VALUES (?, ?, ?,?)";
  try {
    db.query(query2, [name, email, password,role], (error, result) => {
        if (error) throw res.status(500).json({ success: false, message: "Database error", error: error.message });
        res.status(201).json({ success: true, message: "User registered successfully", result: result[0] });
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "User fail registration ", error:error.message});
    
  }
}

function deleteUser(req,res){
    const {name,email}=req.body
    const query3 = "delete from user where name= ? and email= ?;"
try {
     db.query(query3,[name,email],(error,result)=>{
        if (error) throw error ;
    res.status(400).send({ success: true, message: "User Delete successfully"});

     })
} catch (error) {
    res.status(500).send({ success: false, message: "User fail to Delete ", error:error.message});
    
}
}

function getUserInfo(req, res) {
   try {
    const userInfo = req.user; 
    const ID = userInfo.id
    const query5 = `SELECT id, name, email, role , password FROM user WHERE id = ${ID};`

    db.query(query5, (error, result) => {
        if (error) throw error;
        console.log("final result",result);
        
        res.status(200).json({ success: true, user: result[0] });
    });
   } catch (error) {
    res.status(200).json({ success: true, error: error.message });
   }
}


function addProduct(req, res) {
    const { name, price, type, price_range } = req.body;

    const queryProduct = "INSERT INTO product (name, price) VALUES (?, ?);";
    const queryCategory = "INSERT INTO category (type, price_range) VALUES (?, ?);";

    try {
        db.query(queryProduct, [name, price], (error, productResult) => {
            if (error) throw error
        })
        db.query(queryCategory, [type, price_range], (error, categoryResult) => {
            if (error) throw error

            res.status(200).json({ success: true, message: "Product inserted successfully" });
        });
        
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}


function AdminPassReset(req,res){
    const { email,password } = req.body;
    const query7= 'update user set password = ? where email = ?;'
    try {
        db.query(query7,[password,email],(error,result)=>{
            if(error) throw error
            if (result.affectedRows === 0){
                res.status(200).send({success:false,message:"password fail to reset"})
            }
            res.status(200).send({success:true,message:"Password Reset Sucessfully !!"})
        })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
        
    }
}

export default {AdminPassReset, login, registration ,deleteUser,getUserInfo,addProduct};


// function allUsers(req,res){
//     const query4 = "select * from user;"
// try {
//      db.query(query4,(error,result)=>{
//     if (error) throw error 
//     res.status(400).send({ success: true, message: result});

//      })
// } catch (error) {
//     res.status(500).send({ success: false, error:error.message});
    
// }
// }

// function registration(req,res){
//     try {
        
//     } catch (error) {
//         res.status(404).send({error:error.message})
//     }
// }