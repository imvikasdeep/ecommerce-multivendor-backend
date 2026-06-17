import express from "express";
import { addToCart } from "../controllers/cart.controller.js";

const cartRouter = express.Router();

cartRouter.post("/", addToCart);

export default cartRouter;