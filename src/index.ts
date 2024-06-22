import express from "express";

import userRouter from "./controllers/UserController";
import activityRouter from "./controllers/ActivityController";
import { connectDb } from "./utils/connect-db";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

const app = express();

const PORT = process.env.PORT || 8080;

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/users", userRouter);
app.use("/activities", activityRouter);

connectDb()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
  })
  .catch((reason: any) => console.log(reason));
