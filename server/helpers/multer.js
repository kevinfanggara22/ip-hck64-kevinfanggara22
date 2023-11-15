const cloudinary = require("cloudinary").v2;

async function uploadImage(imageFile) {
  const file =
    "data:" +
    imageFile.mimetype +
    ";base64," +
    imageFile.buffer.toString("base64");
  const response = await cloudinary.uploader.upload(file, {
    public_id: imageFile.originalname,
  });
  return response.url;
}

module.exports = uploadImage;
