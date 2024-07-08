// validation.js
import validator from "validator";

export const validateEmail = (email) => {
  if (!validator.isEmail(email)) {
    throw new Error("Invalid email format");
  }
};

export const validatePassword = (password) => {
  if (!validator.isLength(password, { min: 6 })) {
    throw new Error("Password must be at least 6 characters long");
  }
};

export const validateName = (name) => {
  if (!validator.isAlpha(name.replace(/\s+/g, ""))) {
    throw new Error("Name must contain only letters");
  }
};

export const validatePhoneNumber = (phone) => {
  if (!validator.isMobilePhone(phone, "any")) {
    throw new Error("Invalid phone number");
  }
};

export const validateCompany = (company) => {
  if (!company) {
    throw new Error("Company name is required");
  }
};
