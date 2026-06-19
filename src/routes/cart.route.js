import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cart.controller.js";

const cartRouter = express.Router();

cartRouter.post("/", addToCart);
cartRouter.get("/", getCart);
cartRouter.delete("/:id", removeFromCart);

export default cartRouter;