import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.body.userId = decoded.id;
      next();
    } catch (error) {
      res.status(401).json({ status: false, message: "Not authorized" });
    }
  } else {
    res.status(401).json({ status: false, message: "No token" });
  }
};

export default authUser;
