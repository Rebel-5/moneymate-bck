const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");
const auth = require("../utils/auth");

// create a expense
router.post("", auth.validateToken, expenseController.createExpense);

// get all expenses of any group
router.get("/:groupId", auth.validateToken, expenseController.getExpensesForGroup);

module.exports = router;
