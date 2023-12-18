const friendsController = require("../controllers/friendsController");
const express = require("express");
const router = express.Router();
const auth = require("../utils/auth");

// add friend
router.post("/friends/:friendEmail", auth.validateToken, friendsController.addFriend);

// delete friend
router.delete("/friends/:friendEmail", auth.validateToken, friendsController.removeFriend);

// get friends
router.get("/friends", auth.validateToken, friendsController.getAllFriends);

module.exports = router;
