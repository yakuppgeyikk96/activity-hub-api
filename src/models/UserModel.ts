import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  _id?: string;
  name?: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  type: "individual" | "company" | "community";
}

const userSchema: Schema = new Schema({
  name: { type: String, default: "" },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  type: {
    type: String,
    required: true,
    enum: ["individual", "company", "community"],
  },
});

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const hashedPassword = await bcrypt.hash(this.password as string, 10);
    this.password = hashedPassword;

    next();
  } catch (error) {
    throw error;
  }
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
