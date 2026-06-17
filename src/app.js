import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
import vendorRouter from "./routes/vendor.route.js"
import productRouter from "./routes/product.route.js"
import { protect } from "./middleware/auth.middleware.js";
import cartRouter from "./routes/cart.route.js";

const app = express();
const router = express.Router();

app.use(cors());

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server running successfully"
    });
});

app.use("/api/auth", authRouter);
app.use("/api/users", protect, userRouter);
app.use("/api/products", productRouter);
app.use("/api/vendors", protect, vendorRouter);
app.use("/api/cart", protect, cartRouter);

export default app;