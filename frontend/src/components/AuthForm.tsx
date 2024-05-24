import { useForm } from "react-hook-form";
import InputField from "./InputField";
import Button from "./Button";
import { FormData, FormSubmitHandler } from "../types";

interface AuthFormProps {
  formType: string;
  onSubmit: FormSubmitHandler;
}

const AuthForm = ({ formType, onSubmit }: AuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleFormSubmit: FormSubmitHandler = (data) => {
    onSubmit(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-400 to-blue-500 w-full relative">
      <div className="absolute top-1 z-10  text-center bg-teal-500 px-8 py-4">
        <h2 className="text-2xl font-bold text-white">
          {formType === "login" ? "Login" : "Signup"}
        </h2>
      </div>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="relative bg-gray-800 text-white p-8 rounded-lg shadow-lg max-w-md w-full mt-8"
      >
        <div className="flex justify-center  mt-10">
          <img
            src="https://via.placeholder.com/80"
            alt="Profile"
            className="w-40 h-40 rounded-full border-4 border-teal-500"
          />
        </div>
        <InputField
          label="Name"
          type="text"
          name="name"
          register={register}
          errors={errors}
          placeHolder="John"
        />
        <InputField
          label="Email"
          type="email"
          name="email"
          register={register}
          placeHolder="abc@gmail.com"
          errors={errors}
        />
        <InputField
          label="Date of birth"
          type="date"
          name="dateofbirth"
          register={register}
          errors={errors}
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          register={register}
          errors={errors}
          placeHolder="**********"
        />

        <Button text={formType === "login" ? "Login" : "Signup"} />
      </form>
    </div>
  );
};

export default AuthForm;
