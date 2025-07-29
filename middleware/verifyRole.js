/**
 * Middleware to restrict access based on user role
 * @param {string[]} allowedRoles
 */
module.exports = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access forbidden: insufficient privileges.' });
    }
    next();
  };
};