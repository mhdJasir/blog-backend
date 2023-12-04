const JWT = require("jsonwebtoken");
require("dotenv").config();

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer") || token.length < 25) {    
    return res.send(
      {
        status: false,
        message: "un authenticated"
      }
    );
  }
  const payLoad = JWT.verify(
    token.replace("Bearer ", ""),
    process.env.JWT_SECRET
  );
  req.user = { id: payLoad.id, name: payLoad.name };
  next();
};

