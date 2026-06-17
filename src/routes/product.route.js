import express from "express";
import { authorize } from "../middleware/role.middleware.js";
import { protect } from "../middleware/auth.middleware.js";
import Product from "../models/product.model.js";
import { addProduct, deleteProductById, getProductById, getProducts, updateProduct } from "../controllers/product.controller.js";

const productRouter = express.Router();

productRouter.post('/', protect, authorize('vendor', 'admin'), addProduct)
productRouter.get('/', getProducts);
// productRouter.get('/:id', getProductById);
productRouter.put('/:id', protect, authorize('vendor', 'admin'), updateProduct);
productRouter.delete('/:id', protect, authorize('vendor', 'admin'), deleteProductById);

productRouter.get("/drop-index", async (req, res) => {
    try {
        await Product.collection.dropIndex("vendor_1");

        res.json({
            success: true,
            message: "Index dropped"
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
});

export default productRouter;