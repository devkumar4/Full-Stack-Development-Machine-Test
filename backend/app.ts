// app.ts
import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import process from "process";
import authRoutes from "./src/routes/authroutes";
import userRoutes from "./src/routes/userroutes";

dotenv.config();

const app: Application = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL || "", {})
  .then(async () => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

export default app;
