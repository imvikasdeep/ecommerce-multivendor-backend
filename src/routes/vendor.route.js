import express from "express";
import { applyVendor, approveVendor, getVendors } from "../controllers/vendor.controller.js";
import { authorize } from "../middleware/role.middleware.js"

const vendorRouter = express.Router();

vendorRouter.post('/apply', applyVendor)
vendorRouter.get('/', authorize('admin'), getVendors)
vendorRouter.patch('/:id/approve', authorize('admin'), approveVendor)

export default vendorRouter;