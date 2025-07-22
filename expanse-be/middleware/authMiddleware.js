const jwt = require('jsonwebtoken');

exports.requireAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) throw new Error('No token found');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; 
    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};