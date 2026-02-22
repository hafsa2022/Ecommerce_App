import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./src/config/db.js";
import connectCloudinary from "./src/config/cloudinary.js";
import userRouter from "./src/routes/userRoutes.js";
import productRouter from "./src/routes/productRoutes.js";


// App Config

const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary()

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/product", productRouter)

app.get("/", (req, res) => {
  res.send("api working");
});

app.listen(port, () => console.log("Server started on Port:" + port));
