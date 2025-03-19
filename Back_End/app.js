import express from "express"
import cors from "cors"
import userRouter from './Routes/userRouter.js'
import productRouter from "./Routes/productRoutes.js";
import categoryRouter from './Routes/categoryRoutes.js';
import brandRouter from "./Routes/brandRoutes.js";
import path from 'path'
import { dirname } from 'path';
const app = express();

// Middleware Connections
app.use(cors())
app.use(express.json())

//image path 
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, 'uploads/')));
console.log(__dirname)

// Routes
app.use('/user', userRouter)
app.use('/product', productRouter)
app.use('/category', categoryRouter)
app.use('/brand', brandRouter)


// Connection
const PORT = 5000
app.listen(PORT, () => {
    console.log('App running in port: ' + PORT)
})