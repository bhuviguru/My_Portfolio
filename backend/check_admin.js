const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/portfolio_db')
    .then(async () => {
        console.log('Connected to DB');
        const admin = await User.findOne({ username: 'admin' });
        if (admin) {
            console.log('Confirmed: Admin user exists.');
        } else {
            console.log('Alert: Admin user MISSING.');
            // Create if missing
            const newAdmin = new User({
                username: 'admin',
                password: 'password123',
                role: 'admin'
            });
            await newAdmin.save();
            console.log('Fixed: Admin user created.');
        }
        process.exit(0);
    })
    .catch(err => {
        console.error('DB Connection Error:', err);
        process.exit(1);
    });
