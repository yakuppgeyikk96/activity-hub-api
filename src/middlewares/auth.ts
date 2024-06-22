import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default async function auth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["authorization"]?.split(" ")[1];

  console.log(token);

  if (!token) {
    return res.status(401).send({
      success: false,
      message: "Access denied. No token provided",
      status: 401,
      result: null,
    });
  }

  try {
    // @ts-ignore
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    // @ts-ignore
    req.user = decoded;

    next();
  } catch (ex) {
    res.status(401).send({
      success: false,
      message: "Invalid token",
      status: 401,
      result: null,
    });
  }
}
