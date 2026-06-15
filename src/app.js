import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
import vendorRouter from "./routes/vendor.route.js"
import { protect } from "./middleware/auth.middleware.js";


const app = express();

app.use(cors());

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server running successfully"
    });
});

app.use("/api/users", protect, userRouter);
app.use("/api/vendors", protect, vendorRouter);
app.use("/api/auth", authRouter);

export default app;