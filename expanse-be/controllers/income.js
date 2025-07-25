const IncomeSchema = require("../models/incomeModel.js");

exports.addIncome = async (req, res) => {
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
        .json({ message: "Income must be a positive number" });
    }

    const income = new IncomeSchema({
      title,
      amount: numAmount,
      type,
      date,
      category,
      description,
      userId: req.userId
    });

    await income.save();
    res.status(201).json({ message: "Income added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await IncomeSchema.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  try {
    const income = await IncomeSchema.findOneAndDelete({ _id: id, userId: req.userId });
    if (!income) {
      return res.status(404).json({ message: "Income not found or unauthorized" });
    }
    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
