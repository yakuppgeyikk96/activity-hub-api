import express, { Request, Response } from "express";
import auth from "../middlewares/auth";
import {
  createActivity,
  deleteActivity,
  getActivities,
  getActivity,
  updateActivity,
} from "../services/ActivityService";
import multer from "multer";
import { uploadFileToGCloud } from "../infrastructures/google-cloud";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const activities = await getActivities();

  res.status(activities.status).send(activities);
});

router.get("/:id", auth, async (req: Request, res: Response) => {
  const activity = await getActivity(req.params.id);

  res.status(activity.status).send(activity);
});

router.post("/", auth, async (req: Request, res: Response) => {
  const result = await createActivity({
    ...req.body,
    // @ts-ignore
    createdBy: req.user.id,
  });

  res.status(result.status).send(result);
});

router.post(
  "/upload-image/:id",
  upload.single("image"),
  async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).send({ message: "No content!" });
    }

    if (!req.params.id) {
      return res.status(404).send({ message: "Activity not found!" });
    }

    const destination = `activity/${req.params.id}`;
    await uploadFileToGCloud(req.file.path, destination, req.file.mimetype);
    return res.status(200).send({ message: "File uploaded" });
  }
);

router.put("/:id", auth, async (req: Request, res: Response) => {
  const result = await updateActivity(req.params.id, req.body);

  res.status(result.status).send(result);
});

router.delete("/:id", auth, async (req: Request, res: Response) => {
  const result = await deleteActivity(req.params.id);
  res.status(result.status).send(result);
});

export default router;
