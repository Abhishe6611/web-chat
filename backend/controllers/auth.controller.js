import User from "../models/Users.js";
import { generateToken } from "../lib/utils.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        console.log('New signup request received:', { fullName, email });

        // Input validation
        if (!fullName || !email || !password) {
            return res.status(400).json({
                status: 'error',
                message: "All fields are required"
            });

        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                message: "User already exists"
            });
        }

        // Create new user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            profilePic: ""
        });

        const savedUser = await newUser.save();

        // Generate JWT token
        const token = generateToken(savedUser._id, res);

        // Send both messages in response
        res.status(201).json({
            message: "New user created",
            user: savedUser,
            token: token
        });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({
            status: 'error',
            message: "Internal server error",
            error: error.message
        });
    }
};
export const logout = (req, res) => {
    res.send("Logout Endpoint");
};
export const login = (req, res) => {
    res.send("Login Signup");
};