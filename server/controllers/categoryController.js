import pool from "../config/db.js";

export const getCategories = async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM categories`);

    if (data.rowCount === 0)
      res.status(404).json({ message: "Categories not found!" });

    res.status(200).json(data.rows);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong. Try again later." });
  }
};
