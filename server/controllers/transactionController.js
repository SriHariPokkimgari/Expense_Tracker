import pool from "../config/db.js";

export const getAllTransactions = async (req, res) => {
  try {
    const id = req.user.id;

    const transactions = await pool.query(
      `
          SELECT t.id, t.amount, t.description, t.date,
            c.name AS category, c.type
            FROM transactions t JOIN categories c ON t.category_id = c.id
            WHERE t.user_id = $1 
            ORDER BY t.date DESC
        `,
      [id],
    );

    if (transactions.rowCount === 0) {
      return res.status(404).json({ message: "Transactions are not found." });
    }
    res.status(200).json(transactions.rows);
  } catch (error) {
    console.log("Get error while fetching transactions: ", error);
    res.status(500).json({ message: "Something went wrong, Try agian." });
  }
};

export const createTranactions = async (req, res) => {
  try {
    const userId = req.user.id;

    const { category_id, amount, description, date } = req.body;

    if (!category_id || !amount || !date) {
      return res
        .status(400)
        .json({ message: "Category_id, amount, and date is required" });
    }

    const newTransaction = await pool.query(
      `INSERT INTO transactions(user_id, category_id, amount, description, date) 
            VALUES($1, $2, $3, $4, $5) 
            RETURNING *`,
      [userId, category_id, amount, description, date],
    );

    res.status(201).json({
      message: "Transaction is created.",
      transaction: newTransaction.rows,
    });
  } catch (error) {
    console.log("Error while creating transactions: ", error);
    res.status(500).json({ message: "Something went wrong, Try again later." });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const { category_id, amount, description, date } = req.body;

    // Check if the tranactions belongs to current user or not
    const isExist = await pool.query(
      `SELECT id FROM transactions WHERE id = $1 AND user_id = $2`,
      [id, userId],
    );

    if (isExist.rowCount == 0) {
      return res.status(404).json({ message: "Transaction not found." });
    }

    const updatedTransaction = await pool.query(
      `UPDATE transactions 
             SET category_id=$1, amount = $2, description = $3, date = $4
             WHERE id = $5 AND user_id = $6
             RETURNING *`,
      [category_id, amount, description, date, id, userId],
    );

    res.status(200).json({
      message: "Transaction updated succesfully",
      transaction: updateTransaction.rows,
    });
  } catch (error) {
    console.log("Error while updating transaction: ", error);
    res.status(500).json({ message: "Something went wrong, try again later" });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const isExist = await pool.query(
      `SELECT id FROM transactions 
            WHERE id = $1 AND user_id=$2`,
      [id, userId],
    );

    if (isExist.rowCount === 0) {
      return res.status(404).json({ message: "Transaction not found." });
    }

    const deleted = await pool.query(
      `DELETE FROM transactions 
        WHERE id = $1 AND user_id = $2
        RETURNING id`,
      [id, userId],
    );

    res.status(200).json({
      message: "Transaction deletion completed.",
      deletedTransactionId: deleted.rows,
    });
  } catch (error) {
    console.log("Error deleting transaction: ", error);
    res.status(500).json({ message: "Something went wrong, try again later." });
  }
};
