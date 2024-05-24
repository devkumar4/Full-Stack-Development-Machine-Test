import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email?: string;
  password: string;
  name: string;
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
  name: {
    type: String,
    required: true,
  },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
