import db from "../Configuration/Cofig.js";

async function addToCart(req, res) {
    const { id, product_id } = req.body;

    try {
        const query1 = `SELECT addToCart FROM user WHERE id = ?;`;
        db.query(query1, [id], (error, result) => {
            if (error) {
                console.error("Error fetching cart:", error);
                return res.status(500).json({ success: false, message: error.message });
            }

            let ATC = [];

            if (result.length > 0 && result[0].addToCart) {
                ATC = result[0].addToCart.split(",");
            }

            if (ATC.includes(product_id.toString())) {
                return res.status(200).json({ success: true, message: "Product is already in the cart" });
            }

            ATC.push(product_id);
            const updatedCart = ATC.join(",");

            const query2 = `UPDATE user SET addToCart = ? WHERE id = ?`;
            db.query(query2, [updatedCart, id], (error) => {
                if (error) {
                    console.error("Error updating cart:", error);
                    return res.status(500).json({ success: false, message: "Database error" });
                }

                res.status(200).json({ success: true, message: "Product added to cart Successfully", cart: updatedCart });
            });
        });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

function getAddToCart(req, res) {   
    const id = req.params.id
    const query3 = 'select addToCart from user where id = ?'
    db.query(query3, [id], (error, result) => {
        try {
            if (error) {
                console.error("Error updating cart:", error);
            }
            return res.status(200).json({ success: true, addToCart: result[0].addToCart.split(",") });
        } catch (error) {
            console.error("Error adding to cart:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    })
}

function deleteAddToCart(req, res) {
    const  id = req.body.id ;
   const  product_id = req.body.product_id ;
    console.log("id",id);
    

    try {
        const query4 = `SELECT addToCart FROM user WHERE id = ?`;
        db.query(query4, [id], (error, result) => {
            if (error) {
                console.error("Error fetching cart:", error);
                return res.status(500).json({ success: false, message: error.message });
            }
            // console.log("result",result);
            
            let getedATC = [];
            if (result.length > 0 && result[0].addToCart) {
                getedATC = result[0].addToCart.split(",");
            }
console.log("getedATC",getedATC);

            const DeletedATC = getedATC.filter((p) =>p != product_id);

            console.log("DeletedATC",DeletedATC);
            
            const updatedCart = DeletedATC.length > 0 ? DeletedATC.join(",") : null; 

            const query5 = `UPDATE user SET addToCart = ? WHERE id = ?`;
            db.query(query5, [updatedCart, id], (error) => {
                if (error) {    
                    console.error("Error updating cart:", error);
                    return res.status(500).json({ success: false, message: error.message });
                }
                res.status(200).json({ success: true, message: "Product deleted successfully" });
            });
        });

    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export default { addToCart, getAddToCart ,deleteAddToCart};
