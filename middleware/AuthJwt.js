const jwt = require("jsonwebtoken");
const config = require("../config/auth");
const db = require("../models/db");
const User = db.user;

verifyToken = (req, res, next) => {
  var token = req.headers.authorization.split(' ')[1];
  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }
      req.userId = decoded.id_detail_user;
      next();
    });

  } else {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
};

const AuthJwt = {
  verifyToken: verifyToken,
};
module.exports = AuthJwt;