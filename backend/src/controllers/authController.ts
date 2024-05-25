import { Request, Response } from "express";
import User from "../models/user";
import { generateTokens } from "../utils/authUtils";
import bcrypt from "bcrypt";
import { UserData } from "../types";

const DEFAULT_PROFILE_IMAGE_URL =
  "https://www.example.com/default-profile-image.png";

const AuthController = {
  signup: async (req: Request, res: Response) => {
    try {
      const { name, email, password, dateofbirth, profileImage }: UserData =
        req.body;

      if (!name || !email || !password || !dateofbirth) {
        return res.status(400).json({ error: "All fields are required." });
      }

      const existingUserByEmail = await User.findOne({ email });
      if (existingUserByEmail) {
        return res.status(400).json({ error: "Email is already taken." });
      }

      const hashedPassword: string = await bcrypt.hash(password, 12);

      const profileImageUrl = profileImage || DEFAULT_PROFILE_IMAGE_URL;

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        profileImage: profileImageUrl,
        dateofbirth,
      });

      await newUser.save();

      const { accessToken } = generateTokens(newUser);
      res.status(201).json({
        message: "User created successfully",
        accessToken,
      });
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  signin: async (req: Request, res: Response) => {
    try {
      const { email, password }: { email: string; password: string } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "All fields are required." });
      }

      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(400).json({ error: "User not authorized." });
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!isPasswordValid) {
        return res.status(400).json({ error: "Invalid email or password." });
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
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default AuthController;
