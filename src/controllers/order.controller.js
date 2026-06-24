import Cart from "../models/cart.model.js"
import { Order } from "../models/order,model.js";

export const placeOrder = async (req, res) => {
    try {

        const cart = await Cart.findOne({ user: req.user.id }).populate({
            path: "items.product",
            populate: {
                path: "vendor"
            }
        });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            });
        }

        for (const item of cart.items) {
            if (item.quantity >= item.product.stock) {
                return res.status(400).json({
                    success: false,
                    message: `${item.product.name} has insufficient stock`
                });
            }
        }

        let totalAmount = 0;

        const orderItems = cart.items.map(item => {
            totalAmount += item.product.price * item.quantity;
            return {
                product: item.product._id,
                vendor: item.product.vendor._id,
                name: item.product.name,
                price: item.product.price,
                quantity: item.quantity
            };
        })

        const order = await Order.create({
            user: req.user._id,
            items: orderItems,
            totalAmount
        });

        for (const item of cart.items) {
            item.product.stock -= item.quantity;
            await item.product.save();
        }

        cart.items = [];

        await cart.save();

        res.status(201).json({
            success: true,
            data: order
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getMyOrders = async (req, res) => {
    try {

        const orders = await Order.findOne({ user: req.user.id });

        if (!orders) {
            res.status(404).json({
                success: false,
                message: "No orders yet"
            })
        }

        res.status(200).json({
            success: true,
            data: orders
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getOrderById = async (req, res) => {
    try {

        const order = await Order.findById(req.params.id).populate("user", "name email");

        if (!order) {
            res.status(404).json({
                success: false,
                message: "Order not found"
            })
        }

        if (
            req.user.role !== "admin" &&
            order.user._id.toString()
            !== req.user._id.toString()
        ) {

            return res.status(403).json({
                success: false,
                message: "Not authorized"
            });

        }

        res.status(200).json({
            success: true,
            data: order
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getAllOrders = async (req, res) => {

    try {

        const orders =
            await Order.find()
                .populate(
                    "user",
                    "name email"
                )
                .sort({
                    createdAt: -1
                });

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

export const updateOrderStatus = async (req, res) => {

    try {

        const order =
            await Order.findById(
                req.params.id
            );

        if (!order) {
            return res.status(404).json({
                success: false,
                message:
                    "Order not found"
            });
        }

        order.status =
            req.body.status;

        await order.save();

        res.status(200).json({
            success: true,
            data: order
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};