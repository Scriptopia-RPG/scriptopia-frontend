interface DialogueBoxProps {
  text: string;
}

const DialogueBox = ({ text }: DialogueBoxProps) => {
  return (
    <div className="border-secondary bg-bg rounded-lg border-2 p-4">
      <p className="text-fg text-sm whitespace-pre-line sm:text-base">{text}</p>
    </div>
  );
};

export default DialogueBox;
