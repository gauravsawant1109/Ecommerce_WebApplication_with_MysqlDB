import express from "express";
import brandController from "../Controllers/brandController.js";
import middleware from "../middleware/Auth.js";
import multer from "../middleware/multer.js";

const brandRouter = express.Router();

brandRouter.delete("/deleteBrand/:id", middleware.auth, middleware.adminCheck, brandController.deleteBrand);
brandRouter.get("/getAllBrand", brandController.getAllBrand);
brandRouter.post("/addBrand", middleware.auth, middleware.adminCheck, multer.single("brand_image"), brandController.addBrand);
brandRouter.put("/updateBrand/:id", middleware.auth, middleware.adminCheck,multer.single("brand_image"), brandController.updateBrand);
brandRouter.get('/getOneBrand/:brand_id',brandController.getOneBrand)

export default brandRouter;
