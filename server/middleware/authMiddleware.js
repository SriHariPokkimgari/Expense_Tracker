import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authMiddlerware = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access deined. No token provided" });
    }

    const decode = await jwt.decode(token, process.env.JWT_SECRET);

    if (!decode)
      return res
        .status(401)
        .json({ message: "Access deined. Unauthrized user." });
    req.user = decode;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Token expired or Invalid",
    });
  }
};

export default authMiddlerware;
