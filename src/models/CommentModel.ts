import mongoose from "mongoose";
import { IUser } from "./UserModel";

export interface IComment {
  content: string;
  replies: IComment[];
  createdBy: IUser;
  createdAt?: Date;
  updatedAt?: Date;
}

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  replies: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: [] },
  ],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
