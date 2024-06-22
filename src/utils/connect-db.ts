import mongoose from "mongoose";

const DB_HOST = "localhost";
const DB_PORT = 27017;
const DB_NAME = "activity-hub";

const MONGO_URI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

export const connectDb = () => {
  try {
    return mongoose.connect(MONGO_URI);
  } catch (error) {
    throw new Error("Error connecting to database");
  }
};
