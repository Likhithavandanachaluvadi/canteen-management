const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "No token" });

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      role: decoded.role,
      collegeId: decoded.collegeId,
      name: decoded.name,
      email: decoded.email
    };

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ error: "Admin only" });

  next();
};
