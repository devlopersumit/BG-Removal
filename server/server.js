import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import connectDB from "./configs/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import 'dotenv/config';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB().then(() => console.log("✅ MongoDB connected"));

// Routes
app.get("/", (req, res) => res.send("✅ Server is running"));
app.use("/api/user", userRouter);

export const handler = serverless(app);
