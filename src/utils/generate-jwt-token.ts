import { IUser } from "../models/UserModel";
import jwt from "jsonwebtoken";

export const generateJwtToken = (user: IUser) => {
  console.log(process.env.JWT_SECRET);
  return jwt.sign(
    {
      email: user.email,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  );
};
