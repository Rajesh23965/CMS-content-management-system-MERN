import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const failedLoginAttempts = {};

const blockedIPs = {};

const MAX_FAILED_ATTEMPTS = 5;

const BLOCK_TIME = 5 * 60 * 1000;

const isIPBlocked = (ip) => {
  if (blockedIPs[ip]) {
    if (Date.now() - blockedIPs[ip].timestamp < BLOCK_TIME) {
      return true;
    } else {
      delete blockedIPs[ip];
    }
  }
  return false;
};

// LogIn controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const ip = req.ip; // Get IP address of the request

    console.log("Login attempt from IP:", ip);

    // Check if IP is blocked
    if (isIPBlocked(ip)) {
      console.log("Blocked IP tried to login:", ip);
      return res
        .status(403)
        .json({
          msg: "Too many failed attempts. Try again later after 5 minute later.",
        });
    }

    // Validate email and password presence
    if (!email || !password) {
      return res.status(400).json({ msg: "Please provide email and password" });
    }

    // Find user by email in database
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Failed login attempt with invalid email from IP:", ip);
      const errorMessage = trackFailedAttempt(ip);
      return res.status(400).json({ msg: errorMessage });
    }

    // Compare plain text password with hashed password stored in database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Failed login attempt with invalid password from IP:", ip);
      const errorMessage = trackFailedAttempt(ip);
      return res.status(400).json({ msg: errorMessage });
    }

    const token = jwt.sign({ id: user._id }, "secret_key", { expiresIn: "1h" });

    res.status(200).json({ token, user: { id: user._id, email: user.email } });

    if (failedLoginAttempts[ip]) {
      delete failedLoginAttempts[ip];
    }

    console.log("Successful login from IP:", ip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to track failed login attempts for an IP
const trackFailedAttempt = (ip) => {
  if (!failedLoginAttempts[ip]) {
    failedLoginAttempts[ip] = 1;
  } else {
    failedLoginAttempts[ip]++;
  }

  let errorMessage = "Invalid Credentials";
  if (failedLoginAttempts[ip] === 2) {
    errorMessage = "Try again, Invalid Credentials";
  } else if (failedLoginAttempts[ip] === 3) {
    errorMessage = "Please try again, Invalid Credentials";
  } else if (failedLoginAttempts[ip] === 4) {
    errorMessage = "You have too many attempts";
  }

  // Block IP if maximum failed attempts reached
  if (failedLoginAttempts[ip] >= MAX_FAILED_ATTEMPTS) {
    blockedIPs[ip] = {
      timestamp: Date.now(),
      attempts: failedLoginAttempts[ip],
    };
    delete failedLoginAttempts[ip];
    console.log("IP blocked due to too many failed attempts:", ip);
    attempts;
    errorMessage = "Too many failed attempts. Try again later after 5 minutes!";
  }

  return errorMessage;
};

export const create = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).json({ error: error.details });

  try {
    const { email, password, firstName, lastName, phone, company } = req.body;

    const file = req.file;
    if (!file) {
      return res.status(400).json({ msg: "File is required" });
    }

    // Hashing password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone,
      company,
      file: file.path,
    });

    const savedData = await newUser.save();
    res.status(200).json({ data: savedData, msg: "Record Successfully Added" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// To get data by id
export const getAllData = async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Find user data by id
export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userExist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// To Update The Data
export const updateUserData = async (req, res) => {
  // const { error } = validateUser(req.body);
  // if (error) return res.status(400).json({ error: error.details });

  try {
    const id = req.params.id;

    const userExist = await User.findById(id);
    userExist.file;
    if (!userExist) {
      return res.status(404).json({ msg: "User data not found" });
    }

    const updateData = { ...req.body };

    if (req.file) {
      updateData.file = req.file.path;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res
      .status(200)
      .json({ msg: "Data updated successfully", User: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// To delete record
export const deleteData = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "Data not exists" });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ msg: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
