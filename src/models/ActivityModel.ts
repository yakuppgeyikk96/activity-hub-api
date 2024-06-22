import mongoose from "mongoose";
import { IComment } from "./CommentModel";
import { IUser } from "./UserModel";

export interface IActivity {
  image?: Buffer;
  title: string;
  description: string;
  date: Date;
  location: string;
  duration: number;
  tags: string[];
  capacity: number;
  comments: IComment[];
  rating: number;
  createdBy: IUser;
  participants: IUser[];
  createdAt?: Date;
  updatedAt?: Date;
}

const activitySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    duration: { type: Number, required: true },
    tags: { type: [String], default: [] },
    capacity: { type: Number, default: 50 },
    comments: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: [] },
    ],
    rating: { type: Number, default: 0, min: 0, max: 5 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
  },
  { timestamps: true }
);

const Activity = mongoose.model<IActivity>("Activity", activitySchema);

export default Activity;
