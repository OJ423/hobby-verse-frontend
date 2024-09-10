import Link from "next/link";

interface ButtonProps {
  src: string,
  linkText: string
}

const StyledButton:React.FC<ButtonProps> = ({ src, linkText }) => {
  return (
    <Link
      href={src}
      className="text-sm font-bold mt-8 p-4 bg-gray-200 hover:bg-pink-200 w-fit border-b-4 border-gray-500 hover:border-pink-500 transition-all duration-500 rounded-xl"
    >
      {linkText}
    </Link>
  );
}

export default StyledButton