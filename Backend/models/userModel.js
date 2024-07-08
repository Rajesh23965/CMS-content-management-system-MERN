import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: function (value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: "Please enter a valid email address",
    },
  },
  firstName: { type: String, required: [true, "First name is required"] },
  lastName: { type: String, required: [true, "Last name is required"] },
  phone: { type: String, required: [true, "Phone number is required"] },
  file: { type: String },
  company: { type: String, required: [true, "Company is required"] },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
    maxlength: [128, "Password must be less than 128 characters long"],
    validate: {
      validator: function (value) {
        // Require at least one uppercase letter, one lowercase letter, one special character, and one number
        const regex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]\\|:;'<>,.?/])[a-zA-Z\d!@#$%^&*()_\-+={}[\]\\|:;'<>,.?/]{8,}$/;
        return regex.test(value);
      },
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one special character and one number",
    },
  },
});

const User = mongoose.model("User", userSchema);
export default User;
