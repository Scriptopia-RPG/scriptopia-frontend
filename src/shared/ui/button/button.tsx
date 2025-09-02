interface ButtonProps {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ label }: ButtonProps) => {
  return (
    <button type="button" className="bg-gradient-primary w-full rounded-xl py-2.5 text-white">
      {label}
    </button>
  );
};

export default Button;
