import bcrypt from "bcrypt";
import * as userRepository from "../repositories/userRepository.js";
import generateToken from "../utils/generateToken.js";
import generateAdminToken from "../utils/generateAdminToken.js";

const register = async (data) => {
  const existingUser = await userRepository.findByEmail(data.email);
  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await userRepository.createUser({
    ...data,
    password: hashedPassword,
  });

  const token = generateToken(user._id);

  return { user, token };
};

const login = async (email, password) => {
  const user = await userRepository.findByEmail(email);
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken(user._id);

  return { user, token };
};

const adminLogin = async (email, password) => {
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = generateAdminToken(email + password);
    return { token };
  } else {
    throw new Error("Invalid credentials");
  }
};

export { register, login, adminLogin };
