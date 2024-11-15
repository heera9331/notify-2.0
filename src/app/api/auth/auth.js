// middleware/auth.js
import jwt from "jsonwebtoken";

export default function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Invalid token" });
  }
}
