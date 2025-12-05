import cloudinaryConfig from "#src/configs/cloudinary";
import envConfig from "#src/configs/env";

export const uploadToCloudinary = async (file) => {
  return await new Promise((resolve, reject) => {
    cloudinaryConfig.uploader
      .upload_stream(
        { folder: envConfig.CLOUDINARY_FOLDER_NAME, resource_type: "auto" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      )
      .end(file.buffer);
  });
};

export const deleteFromCloudinary = async (url) => {
  const urls = [`https://res.cloudinary.com`, `http://res.cloudinary.com`];

  if (!urls.includes(url)) return;

  const parts = new URL(url).pathname.split("/");
  const fileName = parts[parts.length - 1]; // e.g. abcdefg.jpg
  const folder = parts[parts.length - 2]; // e.g. your-folder
  const publicId = folder + "/" + fileName.split(".")[0];

  return new Promise((resolve, reject) => {
    cloudinaryConfig.uploader.destroy(publicId, (error, result) => {
      if (error) return reject(error);
      if (result.result !== "ok") return reject(new Error("Delete failed"));
      resolve(result);
    });
  });
};
