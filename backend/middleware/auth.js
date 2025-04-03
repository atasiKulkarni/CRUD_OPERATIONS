const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  var token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  else
  {
    const decoded = jwt.verify(token, "RANDOM-TOKEN");
  console.log("requested body",decoded)
     req.user = decoded;
   
  }
  
  return next();
};

module.exports = verifyToken;
