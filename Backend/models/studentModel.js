import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: Number, required: true },
  college: { type: String, required: true },
  avatar: { type: [String], required: true },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
