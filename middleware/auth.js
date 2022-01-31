const jwt = require('jsonwebtoken');
const config = process.env;

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY); 
    req.user = decoded;
  }
  catch (err) {
      return res.status(401).send({
        message: "Invalid Token!"
      });
  };
  return next();
} 

module.exports = verifyToken