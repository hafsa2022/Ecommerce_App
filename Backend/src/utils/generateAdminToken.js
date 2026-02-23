import jwt from "jsonwebtoken";

const generateAdminToken = (email_password) => {
  return jwt.sign(email_password, process.env.JWT_SECRET);
};
export default generateAdminToken;
