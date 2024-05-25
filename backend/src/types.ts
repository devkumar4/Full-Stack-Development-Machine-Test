export interface JwtPayload {
  userId: string;
  name: string;
}

export interface UserData {
  name: string;
  email: string;
  password: string;
  profileImage?: string;
  dateofbirth: string;
}

export interface IUser extends Document {
  email?: string;
  password: string;
  name: string;
  dateofbirth: string;
  profileImage: string;
}
