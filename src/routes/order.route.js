import express from "express";
import { placeOrder } from "../controllers/order.controller.js";

const orderRouter = express.Router();

orderRouter.post("/", placeOrder);

export default orderRouter;