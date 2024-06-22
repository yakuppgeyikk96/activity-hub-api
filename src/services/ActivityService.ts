import { IApiResponse } from "../common/types";
import {
  deleteActivityById,
  getActivityById,
  getAllActivities,
  saveActivity,
  updateActivityById,
} from "../data/ActivityRepository";
import { IActivity } from "../models/ActivityModel";

export const getActivities = async (): Promise<IApiResponse<IActivity[]>> => {
  return await getAllActivities();
};

export const getActivity = async (
  activityId: string
): Promise<IApiResponse<IActivity>> => {
  return await getActivityById(activityId);
};

export const createActivity = async (
  activity: IActivity
): Promise<IApiResponse<IActivity>> => {
  return await saveActivity(activity);
};

export const updateActivity = async (
  activityId: string,
  updatedActivity: IActivity
): Promise<IApiResponse<IActivity>> => {
  return await updateActivityById(activityId, updatedActivity);
};

export const deleteActivity = async (
  activityId: string
): Promise<IApiResponse<IActivity>> => {
  return await deleteActivityById(activityId);
};
