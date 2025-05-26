const jwt = require('jsonwebtoken');

/**
 * Middleware to authenticate JWT tokens.
 * Expects the token in Authorization header as: Bearer <token>
 */
const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info (like id and role) to request object
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (err) {
    return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
  }
};

/**
 * Middleware to restrict access based on user roles.
 * @param  {...string} roles - Allowed roles (e.g., 'Student', 'Teacher')
 */
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
    }

    const userRole = req.user.role.toLowerCase();
    const allowed = roles.map(role => role.toLowerCase());

    if (!allowed.includes(userRole)) {
      return res.status(403).json({ message: 'Forbidden: You do not have permission to perform this action' });
    }

    next();
  };
};

module.exports = {
  authenticate,
  restrictTo,
};
