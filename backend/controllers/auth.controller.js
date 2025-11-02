import User from "../models/Users.js";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import bcrypt from "bcryptjs";
import "dotenv/config";
import {ENV} from "../lib/env.js"

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

        // Send welcome email
        try {
            await sendWelcomeEmail(savedUser.email, savedUser.fullName, ENV.CLIENT_URL);
            console.log('Welcome email sent successfully');
        } catch (emailError) {
            console.error('Failed to send welcome email:', emailError);
            // Continue execution - don't send another response
        }
 
        // Send single response with all data
        return res.status(201).json({
            status: 'success',
            message: "New user created",
            user: savedUser,
            token: token
        });

    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({
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