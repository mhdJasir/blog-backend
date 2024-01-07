import { NextFunction, Request, Response } from "express";

const JWT = require("jsonwebtoken");
require("dotenv").config();

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer") || token.length < 25) {    
    return res.send(
      {
        status: false,
        message: "un authenticated"
      }
    );
  }
  try{
    const payLoad = JWT.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    let body= req.body;
    body.user={ id: payLoad.id, name: payLoad.name };
    req.body = body;
    next();
  }catch(e){
    if(e.message=='jwt expired'){
      return res.send(
        {
          status: false,
          message: "Login Expired. Please Login again"
        }
      );
    }
    return res.send(
      {
        status: false,
        message: "Something went wrong. Please Login again"
      }
    );
  }
};

