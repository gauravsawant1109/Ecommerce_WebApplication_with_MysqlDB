import express from 'express'
import userController from '../Controllers/userController.js'
import middleware from '../middleware/Auth.js'
const userRouter = express.Router()


// Router.post('/registration',Controller.registration)


userRouter.post('/login',userController.login)

userRouter.post('/registration',userController.registration)

userRouter.delete('/delete',middleware.auth,middleware.adminCheck,userController.deleteUser)

userRouter.get('/getUserInfo',middleware.auth,userController.getUserInfo)

userRouter.post('/addProduct',middleware.auth,middleware.adminCheck,userController.addProduct)

userRouter.post('/AdminPassReset',userController.AdminPassReset)


export default  userRouter;