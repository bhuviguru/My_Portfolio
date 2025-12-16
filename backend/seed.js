const mongoose = require('mongoose');
const User = require('./models/User');

const seedAdmin = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/portfolio_db');
        console.log('MongoDB Connected');

        // Check if admin exists
        const adminExists = await User.findOne({ username: 'admin' });
        if (adminExists) {
            console.log('Admin user already exists');
            process.exit();
        }

        // Create Admin
        const user = new User({
            username: 'admin',
            password: 'password123',
            role: 'admin'
        });

        await user.save();
        console.log('Admin user created successfully');
        console.log('Username: admin');
        console.log('Password: password123');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedAdmin();
