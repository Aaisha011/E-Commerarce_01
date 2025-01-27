const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User'); // Import User model

// JWT Secret for token generation (ensure this is set)
const JWT_SECRET = process.env.JWT_SECRET || 'fallbackSecret';

// Example signup route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    console.log('Received data:', req.body); // Log incoming data

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        console.log('User created:', newUser); // Log newly created user
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Example login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log()

    // Basic validation to ensure fields are provided
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Authenticate the user by finding the one with the matching email
        const user = await User.findOne({ where: { email } });

        // Check if user exists and password matches
        if (user && await bcrypt.compare(password, user.password)) {
            console.log(user);

            // Generate a JWT token
            const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

            // Return the token along with the success message
            return res.status(200).json({
                message: 'Login successful',
                token: token
            });
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// Export the router
module.exports = router;
