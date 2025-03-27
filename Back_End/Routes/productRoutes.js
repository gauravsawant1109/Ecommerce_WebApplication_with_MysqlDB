import express from 'express'
// import Controller from '../Controllers/userController.js'
import productController from "../Controllers/productController.js"
import middleware from '../middleware/Auth.js'
import multer from '../middleware/multer.js'
const productRouter = express.Router()


// Router.post('/registration',Controller.registration)


// productRouter.post('/login',productController.login)

// productRouter.post('/registration',productController.registration)

productRouter.delete('/deleteProduct/:product_id',middleware.auth,middleware.adminCheck,productController.deleteProduct)

productRouter.get('/getAllProduct',productController.getAllProduct)

productRouter.get('/getOneProduct/:product_id',productController.getOneProduct)

productRouter.post('/addProduct',middleware.auth,middleware.adminCheck,multer.single('product_image'),productController.addProduct)

productRouter.put('/updateProduct/:product_id',middleware.auth,middleware.adminCheck,multer.single("product_image"),productController.updateProduct)

productRouter.get('/filterProduct',productController.filterProduct)

productRouter.get('/CountOfProduct',productController.CountOfProduct)

productRouter.get('/filteredProduct/:name',productController.filteredProduct)

productRouter.get('/getProductByCategory/:category_id',productController.getProductByCategory)

productRouter.get('/getProductByBrand/:brand_id',productController.getProductByBrand)

productRouter.get("/getfilteredProductByModal", productController.getfilteredProductByModal)

export default  productRouter;