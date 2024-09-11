import Link from "next/link";

interface ButtonProps {
  src: string,
  linkText: string
}

const StyledButton:React.FC<ButtonProps> = ({ src, linkText }) => {
  return (
    <Link
      href={src}
      className="border-solid border-4 border-black py-3 px-6 inline-block rounded-xl mt-8 proper font-semibold hover:bg-pink-500 hover:border-pink-500 hover:text-white transition-all duration-500 ease-out text-xs"
      >
      {linkText}
    </Link>
  );
}

export default StyledButton