import Router from "express";
import {
  Registration,
  deleteUser,
  getUsers,
  Login,
  Logout,
} from "../controllers/authController.js";

const router = Router();

// Signup router for account creation

router.post("/register", Registration);

router.post("/login", Login);

router.get("/logout", Logout);

router.get("/getUser", getUsers);

router.delete("/deleteUser/:id", deleteUser);

export default router;
