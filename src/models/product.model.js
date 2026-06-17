import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        vendor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vendor",
            required: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        stock: {
            type: Number,
            required: true,
            default: 0
        },
        category: {
            type: String,
            required: true
        },
        images: [
            {
                type: String
            }
        ],
        isActive: {
            type: Boolean,
            default: true
        },
        averageRating: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
)

const Product = mongoose.model("Product", productSchema);

export default Product;