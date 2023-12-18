const User = require("../models/userModel");


async function addFriend(req, res) {
    try {
        const user = await User.findById(req.user_id);
        const { friendEmail } = req.body;
        const friend = await User.findOne({ email: friendEmail }).select('email fullName');
        if (!friend) {
            throw new Error('Friend not found');
        }
        await User.updateOne(
            { email: user.email },
            { $addToSet: { friends: { email: friend.email, name: friend.fullName } } }
        );
        res.status(201).json({
            message: "Friend added successfully",
          });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: error.message });
    }
}

async function removeFriend(req, res) {
    try {
        const user = await User.findById(req.user_id);
        const { friendEmail } = req.body;
        await User.updateOne(
            { email: user.email },
            { $pull: { friends: { email: friendEmail } } }
        );
        res.status(201).json({
            message: 'Friend removed successfully',
          });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: error.message });
    }
}

module.exports = { addFriend, removeFriend };
