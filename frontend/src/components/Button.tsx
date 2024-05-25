const Button = ({
  text,
  onClick,
  extraClassnames,
}: {
  text: string;
  onClick?: () => void;
  extraClassnames?: string;
}) => {
  return (
    <button
      className={`w-full py-2 bg-teal-500 hover:bg-teal-600 rounded text-white font-bold ${extraClassnames}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
