

const Button = ({ text, onClick }: { text: string; onClick?: () => void }) => {
  return (
    <button
      className="w-full py-2 bg-teal-500 hover:bg-teal-600 rounded text-white font-bold"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
