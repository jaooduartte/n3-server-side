import jwt from 'jsonwebtoken';
const SECRET_KEY = 'your_secret_key';

export function generateToken(user) {
  return jwt.sign({ id: user.id }, SECRET_KEY, {
    expiresIn: 86400 // Expira em 24 horas
  });
}

export function verifyToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    req.userId = decoded.id;
    next();
  });
}
