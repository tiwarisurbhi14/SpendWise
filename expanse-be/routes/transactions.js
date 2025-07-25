const { addIncome,getIncomes,deleteIncome } = require("../controllers/income");
const {addExpense,getExpenses,deleteExpense} = require("../controllers/expense");
import { requireAuth } from "../middleware/authMiddleware";

const router = require("express").Router();

router
  .post("/add-income", requireAuth,addIncome)
  .get("/get-incomes",requireAuth ,getIncomes)
  .delete("/delete-income/:id", requireAuth, deleteIncome)
  .post("/add-expense", requireAuth, addExpense)
  .get("/get-expenses", requireAuth, getExpenses)
  .delete("/delete-expense/:id", requireAuth, deleteExpense);


module.exports = router;
