import { Request, Response } from "express";
import User from "../models/user";
import { generateTokens } from "../utils/authUtils";
import bcrypt from "bcrypt";

const AuthController = {
  signup: async (req: Request, res: Response) => {
    try {
      const {
        name,
        email,
        password,
        profileImage,
      }: {
        name: string;
        email: string;
        password: string;
        profileImage: string;
      } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required." });
      }

      const existingUserByEmail = await User.findOne({ email });
      if (existingUserByEmail) {
        return res.status(400).json({ error: "Email is already taken." });
      }

      const hashedPassword: string = await bcrypt.hash(password, 12);

      // Create a new user
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        profileImage,
      });

      await newUser.save();

      const { accessToken } = generateTokens(newUser);
      res.status(201).json({
        message: "User created successfully",
        accessToken,
      });
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json({ error: "Internal server errorrr" });
    }
  },

  signin: async (req: Request, res: Response) => {
    try {
      const {
        name,
        password,
        email,
      }: { name: string; password: string; email: number } = req.body;

      if (!name || !password || !email) {
        return res.status(400).json({ error: "All fields are required." });
      }

      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(400).json({ error: "User is not Autorized" });
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ error: "Invalid firstName or password." });
      }

      const { accessToken } = generateTokens(existingUser);
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      res.status(200).json({ accessToken });
    } catch (error) {
      console.error("Error during signin:", error);
      res.status(500).json({ error: "Internal server errorrr" });
    }
  },

  logout: async (req: Request, res: Response) => {
    try {
      res.clearCookie("accessToken", { httpOnly: true, secure: true });
      res.clearCookie("refreshToken", { httpOnly: true, secure: true });
      res.status(204).send();
    } catch (error) {
      console.error("Error during logout:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default AuthController;
