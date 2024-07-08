import Joi from "joi";

const pattern =
  "/(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[$@$!#.])[A-Za-zd$@$!%*?&.]{8,20}/";

export const userValidationSchema = Joi.object({
  email: Joi.string().email().required(),

  password: Joi.string().alphanum().required().min(8).max(20),

  //   confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
  //     "any.only": "Passwords do not match",
  //   }),
  firstName: Joi.string().min(3).max(40).required(),
  lastName: Joi.string().min(3).max(20).required(),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),
  company: Joi.string().optional(),
});

// Function to validate user data against the schema
export const validateUser = (user) => {
  return userValidationSchema.validate(user, { abortEarly: false });
};
