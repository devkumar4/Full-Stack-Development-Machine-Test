import React from "react";
import AuthForm from "../components/AuthForm";
import { FormSubmitHandler } from "../types";

interface AuthPageProps {
  formType: string;
}

const AuthPage: React.FC<AuthPageProps> = ({ formType }) => {
  const handleSubmit: FormSubmitHandler = (data) => {
    // Handle form submission logic
    console.log(data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-teal-400 to-blue-500 w-full">
      <AuthForm formType={formType} onSubmit={handleSubmit} />
    </div>
  );
};

export default AuthPage;
