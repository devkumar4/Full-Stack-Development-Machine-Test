export interface FormData {
  name: string;
  email: string;
  dob: string;
  password: string;
  confirmPassword?: string;
}

export type FormSubmitHandler = (data: FormData) => void;
