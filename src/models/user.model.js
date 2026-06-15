import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false
        },

        role: {
            type: String,
            enum: ["customer", "vendor", "admin"],
            default: "customer"
        },

        isVerified: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);
});


userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(
        enteredPassword,
        this.password
    );
};

userSchema.methods.generateToken = function () {
    return jwt.sign(
        {
            id: this._id,
            role: this.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );
};

const User = mongoose.model("User", userSchema);

export default User;