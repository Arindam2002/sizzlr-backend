const express = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const authRouter = express.Router();

authRouter.post('/api/auth/signup', async (req, res) => {
    try { 
        const { name, email, password , contact, role} = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        bcryptjs.hash(password, 10, async (err, hashedPassword) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }

            let newUser = new User({ 
                name,
                email,
                password: hashedPassword,
                contact,
                role
            });
            newUser = await newUser.save();

            res.json({
                success: true,
                message: 'User created',
                data: newUser
            });
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: error.message
        });
    }
});

module.exports = authRouter;