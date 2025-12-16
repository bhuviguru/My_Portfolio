const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
    const { name, email, message } = req.body;
    try {
        const newMessage = new Message({
            name,
            email,
            message
        });
        const savedMessage = await newMessage.save();
        res.json(savedMessage);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.deleteMessage = async (req, res) => {
    try {
        let message = await Message.findById(req.params.id);
        if (!message) return res.status(404).json({ msg: 'Message not found' });

        await message.deleteOne();
        res.json({ msg: 'Message removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
