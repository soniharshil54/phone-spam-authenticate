const jwt = require('jsonwebtoken');

const { User } = require('../db/models');

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization
    && req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // Make sure exist token
  if (!token) {
    return res.unauthorized();
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    req.user = user;
    if (!req.user) {
      return res.unauthorized();
    }
    next();
  } catch (err) {
    console.error(err);
    return res.unauthorized();
  }
};

const jwtVerify = async (token) => {
  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return null;
    }
    return user;
  } catch (err) {
    return null;
  }
};

module.exports = { protect, jwtVerify };
