const jwt = require('jsonwebtoken');

const secret = 'secret';

const auth = async (req, res, next) => {
  const token = req.headers.autorization.split(' ')[1];

  if (!token)
    return res.status(401).json({ auth: false, message: 'No token provided' });

  jwt.verify(token, secret, (err, user) => {
    if (err) return console.error(err);

    req.userId = user?.id;

    next();
  });
};

module.exports = auth;
