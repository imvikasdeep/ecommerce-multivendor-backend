import express from "express";
import { applyVendor, getVendors } from "../controllers/vendor.controller.js";
import { authorize } from "../middleware/role.middleware.js"

const vendorRouter = express.Router();

vendorRouter.post('/apply', applyVendor)
vendorRouter.get('/', authorize('admin'), getVendors)

export default vendorRouter;