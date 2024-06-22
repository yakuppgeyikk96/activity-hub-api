import Activity, { IActivity } from "../models/ActivityModel";
import generateApiResponse from "./common/generate-api-response";

export const getAllActivities = async () => {
  try {
    const activities = await Activity.find().populate({
      path: "createdBy",
      select: "name email",
    });

    if (!activities) {
      return generateApiResponse<IActivity[]>(
        false,
        404,
        "Activities not found",
        null
      );
    }

    return generateApiResponse<IActivity[]>(true, 200, "", activities);
  } catch (error) {
    return generateApiResponse<IActivity[]>(
      false,
      500,
      "Unexpected error",
      null
    );
  }
};

export const getActivityById = async (id: string) => {
  try {
    const activity = await Activity.findById(id);

    if (activity) {
      return generateApiResponse<IActivity>(true, 200, "", activity);
    }

    return generateApiResponse<IActivity>(
      false,
      404,
      "Activity not found",
      null
    );
  } catch (error) {
    return generateApiResponse<IActivity>(false, 500, "Unexpected error", null);
  }
};

export const saveActivity = async (activity: IActivity) => {
  try {
    const newActivity = new Activity({ ...activity });
    await newActivity.save();
    return generateApiResponse<IActivity>(
      true,
      201,
      "Activity created",
      newActivity
    );
  } catch (error) {
    return generateApiResponse<IActivity>(false, 500, "Unexpected error", null);
  }
};

export const updateActivityById = async (id: string, activity: IActivity) => {
  try {
    const foundActivity = await Activity.findById(id);

    if (foundActivity) {
      foundActivity.title = activity.title;
      foundActivity.description = activity.description;
      foundActivity.date = activity.date;
      foundActivity.location = activity.location;
      foundActivity.duration = activity.duration;
      foundActivity.tags = activity.tags;
      foundActivity.capacity = activity.capacity;
      foundActivity.comments = activity.comments;
      foundActivity.rating = activity.rating;
      foundActivity.createdBy = activity.createdBy;
      foundActivity.participants = activity.participants;
      foundActivity.updatedAt = new Date(Date.now());

      await foundActivity.save();
      return generateApiResponse<IActivity>(
        true,
        200,
        "Activity updated",
        foundActivity
      );
    }

    return generateApiResponse<IActivity>(
      false,
      404,
      "Activity not found",
      null
    );
  } catch (error) {
    return generateApiResponse<IActivity>(false, 500, "Unexpected error", null);
  }
};

export const deleteActivityById = async (id: string) => {
  try {
    const activity = await Activity.findByIdAndDelete(id);

    if (activity) {
      return generateApiResponse<IActivity>(
        true,
        200,
        "Activity deleted",
        activity
      );
    }

    return generateApiResponse<IActivity>(
      false,
      404,
      "Activity not found",
      null
    );
  } catch (error) {
    return generateApiResponse<IActivity>(false, 500, "Unexpected error", null);
  }
};
