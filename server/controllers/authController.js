import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import pool from "../config/db.js";
import { hash, compare } from "../service/password.js";
dotenv.config();

// Signup controller form account creation.
export const Registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      console.log("User details was missing.");
      return res.status(400).json({ message: "User details was missing." });
    }

    const isExist = await pool.query(`SELECT id FROM users WHERE email = $1`, [
      email,
    ]);

    if (isExist.rowCount > 0) {
      return res.status(409).json({ message: "Email already registered." });
    }

    const hashPass = await hash(password);

    const newUser = await pool.query(
      `INSERT INTO users(name, email, password) VALUES ($1, $2, $3)`,
      [name, email, hashPass],
    );

    console.log("regestratoin completed");
    res
      .status(200)
      .json({ message: "Account creation successfully completed" });
  } catch (error) {
    console.error("Account does not created try again", error);
    res
      .status(500)
      .json({ message: "Account does not created try again later." });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await pool.query(`SELECT * FROM users`);

    if (users.rowCount === 0) {
      return res.status(404).json({ message: "Users not found" });
    }
    console.log(users.rows[0]);
    res.status(200).json(users.rows[0]);
  } catch (error) {
    console.error("Error from get users:", error);
    res.status(500).json(error);
  }
};
export const deleteUser = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      console.log("name was missing");
      return res.status(400).json({ message: "Name was missing." });
    }

    const data = await pool.query(`DELETE FROM users WHERE name = $1`, [name]);

    console.log(data.rows);
    res.status(202).json({ message: "User deletion successfully completed" });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

// Login controller
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("User details were missing.");
      return res.status(400).json({ message: "User detail were missing." });
    }

    const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    if (user.rowCount === 0) {
      return res.status(400).json({ message: "Email or password incorrect." });
    }

    const passCheck = await compare(password, user?.rows[0]?.password);

    if (!passCheck) {
      return res.status(400).json({ message: "Email or password incorect." });
    }

    const accessToken = await jwt.sign(
      { id: user.rows[0].id },
      process.env.JWT_SECRET,
      {
        expiresIn: "10m",
      },
    );

    res.status(200).json({
      message: "Login successfully completed",
      accessToken: accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong try again later" });
  }
};
