import Cart from "../models/cart.model.js"
import { Order } from "../models/order,model.js";

export const placeOrder = async (req, res) => {
    try {

        const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            });
        }

        let totalAmount = 0;

        const orderItems = cart.items.map(item => {
            totalAmount += item.product.price * item.quantity;
            return {
                product:
                    item.product._id,

                name:
                    item.product.name,

                price:
                    item.product.price,

                quantity:
                    item.quantity
            };
        })

        const order = await Order.create({
            user: req.user._id,
            items: orderItems,
            totalAmount
        });

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