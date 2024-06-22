import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IUser } from "../models/UserModel";
import {
  createUser,
  deleteUser,
  getUser,
  getUserByEmail,
  getUsers,
  updateUser,
} from "../services/UserService";
import { generateJwtToken } from "../utils/generate-jwt-token";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const result = await getUsers();

  res.status(result.status).send(result);
});

router.get("/:id", async (req: Request, res: Response) => {
  const result = await getUser(req.params.id);
  res.status(result.status).send(result);
});

router.post("/signup", async (req: Request, res: Response) => {
  const user: IUser = { ...(req.body as IUser) };

  const result = await createUser(user);

  if (result.success) {
    const generatedToken = generateJwtToken(user);
    // res.cookie("token", generatedToken, { maxAge: 60 * 60, httpOnly: true });

    return res.status(result.status).send({
      ...result,
      result: generatedToken,
    });
  }

  return res.status(result.status).send(result);
});

router.put("/:id", async (req: Request, res: Response) => {
  const result = await updateUser(req.params.id, req.body);
  res.status(result.status).send(result);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const result = await deleteUser(req.params.id);
  res.status(result.status).send(result);
});

router.post("/login", async (req: Request, res: Response) => {
  const user: IUser = req.body;

  if (!user.email || !user.password) {
    return res.status(400).send({
      success: false,
      message: "Email and password are required",
      status: 400,
      result: null,
    });
  }

  const foundUser = await getUserByEmail(user.email);

  if (foundUser.result) {
    const isPasswordValid = await bcrypt.compare(
      user.password,
      foundUser.result.password
    );

    if (isPasswordValid) {
      const token = jwt.sign(
        { id: foundUser.result._id, email: foundUser.result.email },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1h",
        }
      );

      return res.status(200).send({
        success: true,
        message: "User logged in",
        status: 200,
        result: token,
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Password is incorrect",
        status: 400,
        result: null,
      });
    }
  } else {
    return res.status(404).send({
      success: false,
      message: "User not found",
      status: 404,
      result: null,
    });
  }
});

export default router;
