import React from "react";

const Button = ({ text }: { text: string }) => {
  return (
    <button className="w-full py-2 bg-teal-500 hover:bg-teal-600 rounded text-white font-bold">
      {text}
    </button>
  );
};

export default Button;
