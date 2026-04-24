import Router from "express";
import {
  Registration,
  deleteUser,
  getUsers,
  Login,
} from "../controllers/authController.js";

const router = Router();

// Signup router for account creation

router.post("/registration", Registration);

router.post("/login", Login);

router.get("/getUser", getUsers);

router.delete("/deleteUser/:id", deleteUser);

export default router;
