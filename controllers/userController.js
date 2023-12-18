const User = require("../models/userModel");
const auth = require("../utils/auth");

async function getAllUsers(req, res) {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

// Create a User
async function createUser(req, res) {
  try {
    const newUser = await User.create(req.body);
    token = auth.GenerateToken(newUser._id);
    res.status(201).json({
      message: "User created successfully",
      token: token,
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "User with this email already exists",
      error: error.message,
    });
  }
}

// Get a user by email
async function getUserByEmail(req, res) {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found", data: null });
    }

    res.json({ message: "User found", data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, data: null });
  }
}

async function getUser(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found", data: null });
    }

    res.json({ message: "User found", data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, data: null });
  }
}
// Update a User by Email
async function updateUser(req, res) {
  try {
    const email = req._user.email;
    const updatedUser = await User.findOneAndUpdate({ email }, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "User information updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed. User not found." });
    }

    if (user.password !== password) {
      return res
        .status(401)
        .json({ message: "Authentication failed. Incorrect password." });
    }
    token = auth.GenerateToken(user._id);
    res
      .status(200)
      .json({ message: "Authentication successful", token: token, data: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserByEmail,
  getUser,
  updateUser,
  loginUser,
};
