import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authMiddlerware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ message: "Access deined. No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decode = await jwt.decode(token, process.env.JWT_SECRET);

    req.user = decode;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Token expired or Invalid",
    });
  }
};

export default authMiddlerware;
