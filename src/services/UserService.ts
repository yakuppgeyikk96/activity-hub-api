import { IApiResponse } from "../common/types";
import {
  findUserByIdAndDelete,
  getAllUsers,
  getUserById,
  saveUser,
  updateUserById,
  getUserByEmail as getUserByEmailFromDb,
} from "../data/UserRepository";
import { IUser } from "../models/UserModel";

export const getUsers = async (): Promise<IApiResponse<IUser[]>> => {
  return await getAllUsers();
};

export const getUser = async (userId: string): Promise<IApiResponse<IUser>> => {
  return await getUserById(userId);
};

export const getUserByEmail = async (
  email: string
): Promise<IApiResponse<IUser>> => {
  return await getUserByEmailFromDb(email);
};

export const createUser = async (user: IUser): Promise<IApiResponse<IUser>> => {
  return await saveUser(user);
};

export const updateUser = async (
  userId: string,
  updatedUser: IUser
): Promise<IApiResponse<IUser>> => {
  return await updateUserById(userId, updatedUser);
};

export const deleteUser = async (
  userId: string
): Promise<IApiResponse<IUser>> => {
  return await findUserByIdAndDelete(userId);
};
