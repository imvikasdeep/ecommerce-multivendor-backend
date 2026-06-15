import User from "../models/user.model.js";
import Vendor from "../models/vendor.model.js";

export const applyVendor = async (req, res) => {

    try {

        const existingVendor = await Vendor.findOne({
            user: req.user._id,
        });

        if (existingVendor) {
            return res.status(400).json({
                success: false,
                message:
                    "Vendor profile already exists",
            });
        }

        const vendor = await Vendor.create({
            user: req.user._id,
            shopName: req.body.shopName,
            shopDescription: req.body.shopDescription
        });

        res.status(201).json({
            success: true,
            data: vendor
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

export const getVendors = async (req, res) => {
    try {

        const vendors = await Vendor.find().populate('user', 'name email role');

        res.status(200).json({
            success: true,
            totalCount: vendors.length,
            data: vendors
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
}

export const approveVendor = async (req, res) => {
    try {

        const vendor = await Vendor.findById(req.params.id);

        if (!vendor) {
            return res.status(404).json({
                success: false,
                message: 'Vendor not found'
            })
        }

        vendor.status = "approved";
        await vendor.save();

        await User.findByIdAndUpdate(vendor.user, { role: 'vendor' });

        res.status(200).json({
            status: false,
            message: 'Vendor approved successfully'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}