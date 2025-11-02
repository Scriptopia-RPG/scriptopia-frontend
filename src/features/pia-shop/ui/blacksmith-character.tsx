import Image from 'next/image';

const BlacksmithCharacter = () => {
  return (
    <div className="flex-shrink-0">
      <div className="relative h-48 w-32 sm:h-64 sm:w-40">
        <Image
          src="/images/대장간아저씨.png"
          alt="대장간 아저씨"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
};

export default BlacksmithCharacter;

