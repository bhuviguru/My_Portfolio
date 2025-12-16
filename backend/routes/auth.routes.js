const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const auth = require('../middlewares/auth.middleware');

// @route   POST api/auth/register
// @desc    Register a user
// @access  Public (Should be private in production or one-time setup)
router.post('/register', authController.register);

// @route   POST api/auth/login
// @desc    Auth user & get token
// @access  Public
router.post('/login', authController.login);

// @route   GET api/auth/user
// @desc    Get auth user data
// @access  Private
router.get('/user', auth, async (req, res) => {
    try {
        const user = await require('../models/User').findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
