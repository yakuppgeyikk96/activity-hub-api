import { Storage } from "@google-cloud/storage";
const storage = new Storage({
  keyFilename: "./activityhub-421619-18553cfec884.json",
});

const bucketName = "activityhub-bucket";
const bucket = storage.bucket(bucketName);

export const uploadFileToGCloud = async (
  filePath: string,
  destination: string,
  contentType: string
) => {
  try {
    await bucket.upload(filePath, {
      destination,
      metadata: {
        contentType,
      },
    });
    console.log(`${filePath} uploaded to ${bucketName}/${destination}`);
  } catch (error: any) {
    console.error(`Error uploading file: ${error.message}`);
  }
};
