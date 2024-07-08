import express from "express";
import {
  login,
  create,
  getAllData,
  getOne,
  updateUserData,
  deleteData,
} from "../controller/userController.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/login", login);
router.post("/create", upload.single("file"), create);
router.get("/getall", getAllData);
router.get("/getone/:id", getOne);
router.put("/update/:id", upload.single("file"), updateUserData);
router.delete("/delete/:id", deleteData);

export default router;
