const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const authHeader = req.header("Authorization");
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.substring(7)
      : null; // Remove 'Bearer ' prefix

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
}

module.exports = auth;
