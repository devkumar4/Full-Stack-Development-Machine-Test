import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import { JwtPayload } from "../types";

export const verifyTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let accessToken: string | undefined;
  const authHeader = req.headers["authorization"];
  accessToken = authHeader;
  if (!accessToken) {
    return res.status(401).json({ message: "Access token missing or invalid" });
  }

  try {
    const decodedAccessToken = jwt.verify(
      accessToken,
      process.env.JWT_SECRET || ""
    ) as JwtPayload;

    console.log("Decoded Access Token:", decodedAccessToken);

    const user = await User.findById(decodedAccessToken.userId);

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "User not found" });
    }

    (req as any).user = {
      userId: user._id,
      name: user.name,
    };

    return next();
  } catch (error) {
    console.log("Error verifying token:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
