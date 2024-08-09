const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(req.headers.authorization);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) res.status(403).json("Invalid Token");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("Unauthorized");
  }
};
const verifyAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      res.status(403).json("You need permission to access this resource");
    }
  });
};
const verifyAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You need permission to access this resource");
    }
  });
};
module.exports = { verifyToken, verifyAndAuthorization, verifyAndAdmin };
