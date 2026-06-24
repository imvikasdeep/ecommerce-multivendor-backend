import express from "express";
import { placeOrder, getMyOrders, getOrderById, getAllOrders, updateOrderStatus } from "../controllers/order.controller.js";
import { authorize} from "../middleware/role.middleware.js";

const orderRouter = express.Router();

orderRouter.post("/", placeOrder);
orderRouter.get("/", getMyOrders);
orderRouter.get("/admin/all", authorize("admin"), getAllOrders);
orderRouter.get("/:id", getOrderById);
orderRouter.patch("/:id/status", authorize("admin"), updateOrderStatus);

export default orderRouter;