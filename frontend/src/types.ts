export interface FormData {
  name: string;
  email: string;
  dateofbirth: string;
  password: string;
  profileImage: string;
}

export type FormSubmitHandler = (data: FormData) => void;
