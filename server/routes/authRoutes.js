import Router from "express";
import {
  Registration,
  deleteUser,
  getUsers,
  Login,
} from "../controllers/authController.js";

const router = Router();

// Signup router for account creation

router.post("/signup", (req, res) => {
  Registration(req, res);
});

router.post("/login", (req, res) => {
  Login(req, res);
});

export default router;
