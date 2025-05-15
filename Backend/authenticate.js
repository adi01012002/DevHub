const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  //console.log(req.headers.authorization,"req.headers")

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }
  const token = authHeader.split(" ")[1];
  //console.log(token,"token")
  if (!token) {
    return res.status(401).json({ message: "Token missing in Authorization header" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   // console.log(decoded,"decoded");
    req.user = decoded;
    //console.log(req.user,"req.user")
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token Expired" });
    }
    return res.status(401).json({ message: "Invalid Token" });
  }
};
