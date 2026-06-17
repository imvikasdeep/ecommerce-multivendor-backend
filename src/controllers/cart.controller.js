import Cart from "../models/cart.model.js"
import Product from "../models/product.model.js"

export const addToCart = async (req, res) => {
    try {

        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                meessage: "Product not found!"
            })
        }

        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            cart = await Cart.create({
                user: req.user._id,
                items: [{
                    product: productId,
                    quantity
                }]
            })
        } else {
            const exisitingItem = cart.items.find(item => item.product.toString() === productId);

            if (!exisitingItem) {
                cart.item.push({
                    product: productId,
                    quantity
                })
            } else {
                exisitingItem.quantity += quantity
            }

            await cart.save();

        }

        res.status(200).json({
            success: true,
            data: cart
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}