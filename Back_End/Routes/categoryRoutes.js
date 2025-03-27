import express from 'express'
// import Controller from '../Controllers/userController.js'
import categoryController from '../Controllers/categoryController.js'
import middleware from '../middleware/Auth.js'
import multer from '../middleware/multer.js'
const categoryRouter = express.Router()


// Router.post('/registration',Controller.registration)


// categoryRouter.post('/login',categoryController.login)

categoryRouter.get('/getAllCategories',categoryController.getAllCategories)

categoryRouter.delete('/deleteCategory/:id',middleware.auth,middleware.adminCheck,categoryController.deleteCategory)

categoryRouter.put('/updateCategory/:id',middleware.auth,middleware.adminCheck,multer.single('category_image'),categoryController.updateCategory)

categoryRouter.post('/addCategory',middleware.auth,multer.single('category_image'),categoryController.addCategory)

categoryRouter.get('/getOneCategory/:category_id',categoryController.getOneCategory)


export default  categoryRouter;