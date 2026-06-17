import Product from "../models/product.model.js";
import Vendor from "../models/vendor.model.js";

export const addProduct = async (req, res) => {
    try {

        const vendor = await Vendor.findOne({
            user: req.user._id,
            status: "approved",
        });

        if (!vendor) {
            return res.status(403).json({
                success: false,
                message:
                    "Approved vendor profile required",
            });
        }

        const product = await Product.create({ ...req.body, vendor: vendor._id });

        res.status(201).json({
            success: true,
            data: product
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getProducts = async (req, res) => {
    try {

        const query = {};

        if (req.query.keyword) {
            query.name = {
                $regex: req.query.keyword,
                $options: "i"
            };
        }

        if (req.query.category) {
            query.category = req.query.category;
        }

        if (req.query.minPrice || req.query.maxPrice) {
            query.price = {};

            if (req.query.minPrice) {
                query.price.$gte =
                    Number(req.query.minPrice);
            }

            if (req.query.maxPrice) {
                query.price.$lte =
                    Number(req.query.maxPrice);
            }
        }

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.item_per_page) || 10;
        const skip = (page - 1) * limit;

        let sort = {};

        switch (req.query.sort) {

            case "price":
                sort.price = 1;
                break;

            case "-price":
                sort.price = -1;
                break;

            default:
                sort.createdAt = -1;
        }

        const products = await Product.find(query).sort(sort).skip(skip).limit(limit);

        res.status(200).json({
            success: true,
            totalCount: products.length,
            data: products
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getProductById = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id).populate({
            path: "vendor",
            select: "shopName shopDescription",
            populate: {
                path: "user",
                select: "name email"
            }
        });;

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        res.status(200).json({
            success: true,
            data: product
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updateProduct = async (req, res) => {
    try {

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteProductById = async (req, res) => {
    try {

        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
