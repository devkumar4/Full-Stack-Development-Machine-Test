import { useForm } from "react-hook-form";
import InputField from "./InputField";
import Button from "./Button";
import { FormData, FormSubmitHandler } from "../types";
import { GoPlus } from "react-icons/go";
import AvatarDialog from "./AvatarDialog";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface AuthFormProps {
  formType: string;
  onSubmit: FormSubmitHandler;
}

const schema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  dateofbirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  password: z.string().min(6),
});

const AuthForm: React.FC<AuthFormProps> = ({ formType, onSubmit }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string>("");
  const router = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const handleFormSubmit: FormSubmitHandler = (data) => {
    try {
      const formDatawithImage = { ...data, profileImage };
      onSubmit(formDatawithImage);
      if (formType === "signup") {
        return router("/login");
      } else {
        return router("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const activateDialog = () => {
    setModalVisible(true);
  };

  const deactivateDialog = () => {
    setModalVisible(false);
  };
  const UserProfileImage = localStorage.getItem("profile");

  return (
    <>
      {modalVisible ? (
        <AvatarDialog
          visible={modalVisible}
          closeModal={deactivateDialog}
          setImage={setProfileImage}
        />
      ) : (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-400 to-blue-500 w-full relative">
          <div className="absolute top-1 z-10 text-center bg-teal-500 px-8 py-4">
            <h2 className="text-2xl font-bold text-white">
              {formType === "login" ? "Login" : "Signup"}
            </h2>
          </div>

          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="relative bg-gray-800 text-white p-8 rounded-lg shadow-lg max-w-md w-full mt-8"
          >
            {formType == "signup" ? (
              <div className="flex justify-center mt-10">
                <div
                  className="w-40 h-40 rounded-full border-4 border-teal-500 cursor-pointer hover:border-teal-700 hover:bg-gray-700 flex justify-center items-center"
                  onClick={activateDialog}
                >
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full rounded-full"
                    />
                  ) : (
                    <GoPlus
                      className="text-teal-500 transition-all"
                      size={60}
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className="flex justify-center mt-10">
                <div
                  className="w-40 h-40 rounded-full border-4 border-teal-500 cursor-pointer  flex justify-center items-center"
                  // onClick={activateDialog}
                >
                  {UserProfileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full rounded-full"
                    />
                  ) : (
                    <GoPlus
                      className="text-teal-500 transition-all"
                      size={60}
                    />
                  )}
                </div>
              </div>
            )}

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
            <div className="flex justify-center mt-4">
              {formType === "signup" ? (
                <p className="text-center">
                  Already have an account ?{" "}
                  <Link to="/login" className="underline">
                    Login
                  </Link>
                </p>
              ) : (
                <p>
                  Don't have an account?{" "}
                  <Link to="/signup" className="underline">
                    Signup
                  </Link>
                </p>
              )}
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AuthForm;
