const Expense = require("../models/expenseModel");
const Groups = require("../models/groupModel");
const User = require("../models/userModel");


const createExpense = async (req, res) => {
  try {
    const { description, amount, paidBy, group } = req.body;
    if (!amount || !paidBy || !group){
      res.status(500).json({
        message: "Attribute can not be null",
      });
    }
    const newExpense = new Expense({ description, amount, paidBy, group });
    await newExpense.save();
    const user = await User.findById(paidBy);
    const _group = await Groups.findById(group);
    const borrow_amount = amount / _group.members.length
    const lent_amount = borrow_amount * (_group.members.length - 1)
    _group.members.forEach(member => {
      console.log(member.email)
      if (member.email !== user.email) {
          member.amount += -borrow_amount;
      } else {
        member.amount += lent_amount;
      }
    });
    _group.save()
    res
      .status(201)
      .json({ message: "Expense Written Successfully", newExpense });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

async function getExpensesForGroup(req, res) {
  try {
    const group = await Groups.findOne({ "_id": req.params.groupId });
    if (group.length === 0){
      res.json({ message: 'Group not found' });
    }
    console.log(req.user_id)
    const user = await User.findById(req.user_id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found in the database" });
    }
    let totalExpense = 0.0;
    let count = group.members.length
    const expenses = await Expense.find({ group: req.params.groupId });
    for (const expense of expenses) {
      if (expense.paidBy == req._user._id){
        totalExpense += expense.amount/count
      }
      else {
        totalExpense -= expense.amount/count
      }
    };
    totalExpense = Number(totalExpense.toFixed(2))
    res.json({ message: "All Expenses", totalExpense, expenses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createExpense,
  getExpensesForGroup,
};
