import React from "react";
import AuthForm from "../components/AuthForm";
import { FormSubmitHandler } from "../types";
import { useAuth } from "../hooks/useAuth";

interface AuthPageProps {
  formType: string;
}

const AuthPage: React.FC<AuthPageProps> = ({ formType }) => {
  const { authenticateUser } = useAuth();

  const handleSubmit: FormSubmitHandler = async (data) => {
    const endpoint = formType === "signup" ? "signup" : "login";
    await authenticateUser(data, endpoint);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-teal-400 to-blue-500 w-full">
      <AuthForm formType={formType} onSubmit={handleSubmit} />
    </div>
  );
};

export default AuthPage;
