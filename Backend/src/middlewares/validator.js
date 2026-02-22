import validator from "validator";

const registerValidator = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || validator.isEmpty(name.trim())) {
    return res.status(400).json({ message: "Name is required" });
  }

  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ message: "Valid email is required" });
  }

  if (!password || !validator.isLength(password, { min: 6 })) {
    return res.status(400).json({
      message: "Password must be at least 6 characters",
    });
  }

  next();
};

const loginValidator = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ message: "Valid email is required" });
  }

  if (!password || validator.isEmpty(password)) {
    return res.status(400).json({ message: "Password is required" });
  }

  next();
};
export { registerValidator, loginValidator };
