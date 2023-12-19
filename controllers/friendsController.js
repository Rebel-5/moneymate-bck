const User = require("../models/userModel");


async function addFriend(req, res) {
    try {
        const user = await User.findById(req.user_id);
        const { friendEmail } = req.params;
        const friend = await User.findOne({ email: friendEmail }).select('email fullName');
        if (!friend) {
            res.status(400).json({ message: 'Friend not found' });
        }
        const friendObject = { friends: { email: friend.email, name: friend.fullName } }
        await User.updateOne(
            { email: user.email },
            { $addToSet:  friendObject}
        );
        res.status(201).json({
            message: "Friend added successfully",
            friend: friendObject
          });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: error.message });
    }
}

async function removeFriend(req, res) {
    try {
        const user = await User.findById(req.user_id);
        const { friendEmail } = req.params;
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

async function getAllFriends(req, res) {
    try {
        const _user = await User.findById(req.user_id);
        const user = await User.findOne({ email: _user.email }).select('friends');
        if (!user) {
            res.status(400).json({ message: 'User not found' });
        }
        res.status(201).json({
            friends: user.friends,
          });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: error.message });
    }
}

module.exports = { addFriend, removeFriend, getAllFriends };
