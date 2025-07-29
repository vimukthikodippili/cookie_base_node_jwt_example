const jwt = require('jsonwebtoken');

/**
 * Middleware to verify JWT from HTTP-only cookie
 */
module.exports = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Invalid token:', err);
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
};