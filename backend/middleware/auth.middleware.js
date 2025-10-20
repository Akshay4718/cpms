const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');

    if (!authHeader) return res.status(401).json({ msg: 'Login Required!' });

    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

    if (!token) return res.status(401).json({ msg: 'Login Required!' });

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ msg: 'Session Expired! Please Login Again.' });
      } else {
        return res.status(401).json({ msg: 'Invalid Token! Please Login.' });
      }
    }

    // If you really need to verify token against DB, uncomment this:
    // const user = await User.findOne({ _id: decoded.userId, token });
    // if (!user) return res.status(401).json({ msg: 'Token is not valid! Please Login.' });

    // Instead, just find the user by ID
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ msg: 'User not found! Please Login.' });

    req.user = user;
    next();
  } catch (err) {
    console.error('auth.middleware.js =>', err);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

module.exports = authenticateToken;
