// import validator from "validator";
// import bcrypt from "bcrypt";
// // import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// const createToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET);
// };
// // Login
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Checking if user exists or not
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.json({
//         success: false,
//         message: "User doesn't exists",
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (isMatch) {
//       const token = createToken(user._id);
//       return res.json({
//         success: true,
//         token,
//       });
//     } else {
//       res.json({
//         success: false,
//         message: "Invalid credentials",
//       });
//     }
//   } catch (error) {
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // Registration
// const registerUser = async (req, res) => {
//   try {
//     const { email, name, password } = req.body;

//     // Checking if user exists or not
//     const exists = await User.findOne({ email });
//     if (exists) {
//       return res.json({
//         success: false,
//         message: "User already exists",
//       });
//     }

//     // Validating email format & strong password

//     if (!validator.isEmail(email)) {
//       return res.json({
//         success: false,
//         message: "Please enter a valid email",
//       });
//     }

//     if (password.length < 8) {
//       return res.json({
//         success: false,
//         message: "Please enter a strong password",
//       });
//     }

//     // Hashing user password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     const newUser = new userModel({
//       name,
//       email,
//       password: hashedPassword,
//     });
//     const user = await newUser.save();
//     const token = createToken(user._id);
//     res.json({
//       success: true,
//       token,
//     });
//   } catch (error) {
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // Login for Admin
// const adminLogin = async (req, res) => {};

// export { loginUser, registerUser, adminLogin };

import * as userService from "../services/userService.js";

const register = async (req, res) => {
  try {
    const result = await userService.register(req.body);
    res.status(201).json({ status: true, ...result });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const result = await userService.login(req.body.email, req.body.password);
    res.json({ status: true, ...result });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

// Login for Admin
const adminLogin = async (req, res) => {};

export { register, login, adminLogin };
