const ExpenseSchema = require("../models/expenseModel.js");

exports.addExpense = async (req, res) => {
  try {
    const { title, amount, type, date, category, description } = req.body;
    if (
      ![title, amount,  date, category, description].every(
        (field) => field !== undefined && field !== null
      )
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      return res
        .status(400)
        .json({ message: "Expense must be a positive number" });
    }

    const expense = new ExpenseSchema({
      title,
      amount: numAmount,
      type,
      date,
      category,
      description,
      userId:req.userId
    });

    await expense.save();
    res.status(201).json({ message: "Expense added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expense = await ExpenseSchema.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await ExpenseSchema.findOneAndDelete({ _id: id, userId: req.userId });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found or unauthorized" });
    }
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
