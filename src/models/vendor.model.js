import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        shopName: {
            type: String,
            required: true,
            trim: true
        },
        shopDescription: {
            type: String,
            required: true,
            trim: true
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;