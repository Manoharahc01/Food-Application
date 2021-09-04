const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      const error = new Error('Not authenticated.');
      error.statusCode = 401;
      next(error);
    }
    const token = authHeader
    let decodedToken;
    decodedToken = jwt.verify(token, 'somesupersecretsecret');
    if (!decodedToken) {
      const error = new Error('Not authenticated.');
      error.statusCode = 401;
      throw error;
    }
    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    err.statusCode = 500;
    next(err);
    throw err;
  }
};