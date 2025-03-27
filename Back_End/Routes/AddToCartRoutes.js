import express from "express";
import middleware from "../middleware/Auth.js";
import AddToCartController from "../Controllers/AddToCartController.js";

const router = express.Router();

router.post("/add",middleware.auth, AddToCartController.addToCart);
router.get("/getAddToCart/:id", AddToCartController.getAddToCart);
router.delete('/deleteAddToCart', AddToCartController.deleteAddToCart)
// router.delete("/remove/:cartId", AddToCartController.removeFromCart);
// router.delete("/clear/:userId", AddToCartController.clearCart);

export default router;
