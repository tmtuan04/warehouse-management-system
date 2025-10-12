import jwt from "jsonwebtoken";

export const generateToken = (user, res) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.roles.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  console.log("Generated JWT token:", token); // check

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    httpOnly: true, // Prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", // Cookie chỉ được gửi khi yêu cầu đến từ cùng một miền, giúp bảo vệ khỏi tấn công CSRF (Cross-Site Request Forgery)
    secure: process.env.NODE_ENV !== "development", // Phần secure trong cookie được thiết lập để đảm bảo rằng cookie chỉ được gửi qua kết nối HTTPS
  });
}

export const protect = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json({ message: "Not authorized, no token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, role }
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Check role
// Demo: router.get("/admin/dashboard", protect, restrictTo("admin"), adminController.dashboard);
export const restrictTo = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.roles)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
}