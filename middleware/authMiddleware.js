const jwt = require('jsonwebtoken');

// Middleware to authenticate user via JWT token in Authorization header
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info (id, role, etc.) to request object for downstream use
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Middleware to restrict access to only teachers
const checkTeacher = (req, res, next) => {
  if (!req.user || req.user.role !== 'teacher') {
    return res.status(403).json({ error: 'Forbidden: Only teachers can perform this action' });
  }
  next();
};

module.exports = {
  authenticate,
  checkTeacher,
  protect: authenticate, // alias if needed
};
