const friendsController = require("../controllers/friendsController");
const express = require("express");
const router = express.Router();
const auth = require("../utils/auth");

// add friend
router.post("/friends/:friendEmail", friendsController.addFriend);

// delete friend
router.delete("/friends/:friendEmail", friendsController.removeFriend);

module.exports = router;
