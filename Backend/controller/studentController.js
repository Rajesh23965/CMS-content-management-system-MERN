import Student from "../models/studentModel.js";
export const create = async (req, res) => {
  try {
    const { name, email, phone, age, college } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ msg: "File is required" });
    }

    const filePaths = files.map((file) => file.path);

    const newStudent = new Student({
      name,
      email,
      phone,
      age,
      college,
      avatar: filePaths,
    });

    const savedData = await newStudent.save();
    res.status(200).json({ data: savedData, msg: "Record successfully added" });
  } catch (error) {
    console.error("Error creating student record:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllData = async (req, res) => {
  try {
    const studentData = await Student.find();
    res.status(200).json(studentData);
  } catch (error) {
    console.error("Error getting all data:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await Student.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userExist);
  } catch (error) {
    console.error("Error getting user by id:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const updateStudentData = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await Student.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "User data not found" });
    }

    const updateData = { ...req.body };
    if (req.files) {
      updateData.avatar = req.files.map((file) => file.path);
    }

    const updatedStudent = await Student.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res
      .status(200)
      .json({ msg: "Data updated successfully", User: updatedStudent });
  } catch (error) {
    console.error("Error updating user data:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const deleteData = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await Student.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "Record not exists" });
    }
    await Student.findByIdAndDelete(id);
    res.status(200).json({ msg: "Data deleted successfully" });
  } catch (error) {
    console.error("Error deleting user data:", error.message);
    res.status(500).json({ error: error.message });
  }
};
