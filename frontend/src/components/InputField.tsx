import { UseFormRegister, FieldError } from "react-hook-form";
import { FormData } from "../types";
interface inputFieldTypes {
  label: string;
  name: keyof FormData;
  register: UseFormRegister<FormData>;
  type?: string;
  errors: { [key in keyof FormData]?: FieldError };
  placeHolder?: string;
}

const InputField = ({
  label,
  type,
  name,
  register,
  errors,
  placeHolder,
}: inputFieldTypes) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        {...register(name as "email")}
        className="w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded focus:outline-none focus:border-teal-500 text-black"
        placeholder={placeHolder}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default InputField;
