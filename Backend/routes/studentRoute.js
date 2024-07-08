import express from "express";
const router = express.Router();
import {
  create,
  getAllData,
  getOne,
  updateStudentData,
  deleteData,
} from "../controller/studentController.js";
import upload from "../MiddleWare/upload.js";

router.post("/create", upload, create);
router.get("/getall", getAllData);
router.get("/getone/:id", getOne);
router.put("/update/:id", upload, updateStudentData);
router.delete("/delete/:id", deleteData);

export default router;
