import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    callback(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`);
  },
});

const fileFilter = (_req, file, callback) => {
  if (["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.mimetype)) callback(null, true);
  else callback(new Error("Only JPG, PNG, WEBP, and GIF image files are allowed."));
};

export const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });
