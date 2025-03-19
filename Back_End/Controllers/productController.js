// import jwt from 'jsonwebtoken'
import db from "../Configuration/Cofig.js"

const baseURL = "http://localhost:5000"

function addProduct(req, res) {
    console.log("req from body :", req.body);

    try {
        const { product_name, price, discription, stock, category_id, brand_id } = req.body;
        if (!product_name) {
            return res.status(400).send({ success: false, message: "Product name is required" });
        }

        const product_image = req.file ? req.file.filename : null;
        const q1 = 'INSERT INTO product (product_name, price, discription, stock, category_id, brand_id, product_image) VALUES (?, ?, ?, ?, ?, ?, ?)';

        db.query(q1, [product_name, price, discription, stock, category_id, brand_id, product_image], (error, result) => {
            if (error) throw error;
            res.status(200).send({ success: true, message: "Product added successfully" });
        });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
}


function getAllProduct(req, res) {
    const q2 = 'select * from product;'

    try {
        db.query(q2, (error, result) => {
            if (error) throw error
            if (result.affectedRows == 0) {
                res.status(200).send({ success: false, message: 'No Product Found' })

            }

            const allProducts = result.map((c) => ({
                ...c,
                productImage: c.product_image ?
                    `${baseURL}/uploads/${c.product_image}`
                    : null
            }))
            res.status(200).send({ success: true, allProducts: result })
        })
    } catch (error) {
        res.status(500).send({ success: false, error: error.message })

    }
}


function deleteProduct(req, res) {
    const product_id = req.params.product_id
    const q3 = 'delete from product where product_id = ?'
    try {
        db.query(q3, [product_id], (error, result) => {
            if (error) throw error
            if (result.affectedRows == 0) {
                res.status(200).send({ success: false, message: "product failed to delete" })
            }
            res.status(200).send({ success: true, message: "product deleted" })
        })
    } catch (error) {
        res.status(500).send({ success: false, error: error.message })

    }
}

function updateProduct(req, res) {
    const { product_name, price, discription, stock, category_id, brand_id } = req.body;
    const product_id = req.params.product_id;
    const product_image = req.file ? req.file.filename : null;
    let q4;
    let queryParams;
    if (product_image) {
        q4 = 'UPDATE product  SET product_name = ?, price = ?, discription = ?, stock = ?, category_id = ?, brand_id = ?, product_image = ?  WHERE product_id = ?;';
        queryParams = [product_name, price, discription, stock, category_id, brand_id, product_image, product_id];

    } else {
        q4 = 'UPDATE product  SET product_name = ?, price = ?, discription = ?, stock = ?, category_id = ?, brand_id = ?  WHERE product_id = ?;';
        queryParams = [product_name, price, discription, stock, category_id, brand_id, product_id];

    }
    try {
        db.query(q4, queryParams, (error, result) => {
            if (error) throw error
            if (result.affectedRows == 0) {
                res.status(200).send({ success: false, message: 'product fail to update' })

            }
            res.status(200).send({ success: true, message: 'product name update successfully' })
        })

    } catch (error) {
        res.status(500).send({ success: false, error: error.message })

    }
}

function getOneProduct(req, res) {

    const product_id = req.params.product_id
    const q5 = 'select * from product where product_id = ? ;'

    try {
        db.query(q5, [product_id], (error, result) => {
            if (error) throw error
            res.status(200).send({ success: true, allProducts: result })
        })
    } catch (error) {
        res.status(500).send({ success: false, error: error.message })

    }
}

function filterProduct(req, res) {
    const product_name = req.query.product_name
    const q6 = 'select * from product where product_name like ? ;'

    try {
        db.query(q6, [`%${product_name}%`], (error, result) => {
            if (error) throw error
            console.log(req.query.product_name);

            res.status(200).send({ success: true, filteredProduct: result })
        })
    } catch (error) {
        res.status(500).send({ success: false, error: error.message })

    }
}

function CountOfProduct(req, res) {
    const q7 = 'select count(product_id) as TotalProduct from product ;'
    try {
        db.query(q7, (error, result) => {
            if (error) throw error
            console.log("Count of Product is ", result);

            res.status(200).send({ success: true, ProductCount: result[0] })
        })
    } catch (error) {
        res.status(500).send({ success: false, error: error.message })

    }
}


function filteredProduct(req, res) {
    const name = req.params.name
    const q8 = `select * from product where product_name like ? ;`
    try {
        db.query(q8, [`%${name}%`], (error, result) => {
            if (error) throw error
            console.log("Count of Product is ", result);

            res.status(200).send({ success: true, filteredProducts: result })
        })
    } catch (error) {
        res.status(500).send({ success: false, error: error.message })

    }

}
const getProductByCategory = (req, res) => {
    const category_id = req.params.category_id;
    const q9 = 'SELECT * FROM product WHERE category_id = ?';
    const q10 = 'SELECT * FROM category WHERE category_id = ?';

    try {

        db.query(q10, [category_id], (error, categoryResults) => {
            if (error) return res.status(500).json({ success: false, message: error.message });

            if (categoryResults.length === 0) {
                return res.status(200).json({ success: false, message: 'Category not found' });
            }


            db.query(q9, [category_id], (error, productResults) => {
                if (error) return res.status(500).json({ success: false, message: error.message });

                // if (productResults.length === 0) {
                //     return res.status(200).json({ success: false, message: 'No products found for this category' });
                // }



                const allProducts = productResults.map((p) => ({
                    ...p,
                    productImage: p.product_image ? `${baseURL}/uploads/${p.product_image}` : null,
                }));


                res.status(200).json({ success: true, category: categoryResults[0], allProducts: allProducts });
            });
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getProductByBrand = (req, res) => {
    const brand_id = req.params.brand_id;
    const q11 = 'SELECT * FROM product WHERE brand_id = ?';
    const q12 = 'SELECT * FROM brand WHERE brand_id = ?';

    try {

        db.query(q12, [brand_id], (error, brandResults) => {
            if (error) return res.status(500).json({ success: false, message: error.message });

            if (brandResults.length === 0) {
                return res.status(200).json({ success: false, message: 'Brand not found' });
            }


            db.query(q11, [brand_id], (error, productResults) => {
                if (error) return res.status(500).json({ success: false, message: error.message });

                // if (productResults.length === 0) {
                //     return res.status(200).json({ success: false, message: 'No products found for this category' });
                // }



                const allProducts = productResults.map((p) => ({
                    ...p,
                    productImage: p.product_image ? `${baseURL}/uploads/${p.product_image}` : null,
                }));


                res.status(200).json({ success: true, brand: brandResults[0], allProducts: allProducts });
            });
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const getfilteredProductByModal = (req, res) => {
    const { category_id, brand_id } = req.query;
  
    let query = "SELECT * FROM product WHERE 1=1";
    let queryParams = [];

    if (category_id) {
      query += " AND category_id = ?";
      queryParams.push(category_id);
    }

    if (brand_id) {
      query += " AND brand_id = ?";
      queryParams.push(brand_id);
    }

    try {
    

        db.query(query, queryParams ,(error,result)=>{
            if (error) return res.status(500).json({ success: false, message: error.message });

            if (result.length === 0) {
                return res.status(200).json({ success: false, message: 'product not found' });
            }
      res.status(200).send({success:true , filteredProducts:result });

        });
  
    } catch (error) {
      console.error("Error fetching filtered products:", error);
      res.status(500).send({success:true, message: error.message });
    }
  };

export default {getfilteredProductByModal, getProductByBrand, getProductByCategory, filteredProduct, addProduct, getAllProduct, deleteProduct, updateProduct, getOneProduct, filterProduct, CountOfProduct }

