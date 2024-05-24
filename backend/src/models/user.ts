import { timeStamp } from "console";
import mongoose, { Date, Document, Schema } from "mongoose";

export interface IUser extends Document {
  email?: string;
  password: string;
  name: string;
  dateofbirth: Date;
  profileImage: string;
}

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateofbirth: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
  },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
