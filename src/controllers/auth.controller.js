import express from "express";
import User from "../models/user.model.js";

export const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        let exsistingUser = await User.findOne({ email });

        if (exsistingUser) {
            return res.status(404).json({
                success: false,
                message: 'User already Exsists'
            });
        }

        const user = await User.create({
            name, email, password,
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        let user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = user.generateToken();

        res.status(200).json({
            success: true,
            token
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }

}

export const getMe = async (req, res) => {
    res.status(200).json({
        success: true,
        data: req.user
    });
};

