import { IApiResponse } from "../common/types";
import User, { IUser } from "../models/UserModel";
import generateApiResponse from "./common/generate-api-response";

export const getAllUsers = async (): Promise<IApiResponse<IUser[]>> => {
  try {
    const users = await User.find({});

    return generateApiResponse<IUser[]>(true, 200, "", users);
  } catch (error) {
    return generateApiResponse<IUser[]>(false, 500, "Unexpected error", null);
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await User.findById(id);
    if (user) {
      return generateApiResponse<IUser>(true, 200, "", user);
    }

    return generateApiResponse<IUser>(false, 404, "User not found", null);
  } catch (error) {
    return generateApiResponse<IUser>(false, 500, "Unexpected error", null);
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email }).select("+password");

    if (user) {
      return generateApiResponse<IUser>(true, 200, "", user);
    } else {
      return generateApiResponse<IUser>(false, 404, "User not found", null);
    }
  } catch (error) {
    return generateApiResponse<IUser>(false, 500, "Unexpected error", null);
  }
};

export const saveUser = async (user: IUser) => {
  try {
    const newUser = new User({ ...user });
    await newUser.save();
    return generateApiResponse<IUser>(true, 201, "User created", newUser);
  } catch (error) {
    return generateApiResponse<IUser>(false, 500, "Unexpected error", null);
  }
};

export const updateUserById = async (id: string, user: IUser) => {
  try {
    const foundUser = await User.findById(id);

    if (foundUser) {
      foundUser.email = user.email;
      foundUser.password = user.password;
      foundUser.updatedAt = new Date(Date.now());

      await foundUser.save();

      return generateApiResponse<IUser>(true, 200, "User updated", foundUser);
    }

    return generateApiResponse<IUser>(false, 404, "User not found", null);
  } catch (error: any) {
    if (error.errors.email || error.errors.password) {
      return generateApiResponse<IUser>(
        false,
        400,
        `Missing required field: ${
          error.errors.email?.path || error.errors.password?.path || ""
        }`,
        null
      );
    }
    return generateApiResponse<IUser>(false, 500, "Unexpected error", null);
  }
};

export const findUserByIdAndDelete = async (id: string) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (deletedUser) {
      return generateApiResponse<IUser>(true, 200, "User deleted", deletedUser);
    }

    return generateApiResponse<IUser>(false, 404, "User not found", null);
  } catch (error) {
    return generateApiResponse<IUser>(false, 500, "Unexpected error", null);
  }
};
