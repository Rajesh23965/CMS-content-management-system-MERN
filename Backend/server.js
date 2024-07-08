import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import multer from "multer";
import cors from "cors";
import path from "path";
import router from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1/cmsdata")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use("/api", router);

export default app;
