// import express from "express";
// import {
//   loginUser,
//   registerUser,
//   adminLogin,
// } from "../controllers/userController.js";

// const userRouter = express.Router();

// userRouter.post("/register", registerUser);
// userRouter.post("/login", loginUser);
// userRouter.post("/admin", adminLogin);

// export default userRouter;

import express from "express";
import * as userController from "../controllers/userController.js";
// import protect from "../middlewares/authMiddleware.js";
import {
  registerValidator,
  loginValidator
} from "../middlewares/validator.js";

const router = express.Router();

router.post("/register", registerValidator, userController.register);
router.post("/login", loginValidator, userController.login);
router.post("/admin", userController.adminLogin);

// router.get("/profile", protect, (req, res) => {
//   res.json(req.user);
// });

export default router;
