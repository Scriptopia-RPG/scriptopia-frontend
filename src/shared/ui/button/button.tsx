interface ButtonProps {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-gradient-primary w-full cursor-pointer rounded-xl py-2.5 text-white"
    >
      {label}
    </button>
  );
};

export default Button;
