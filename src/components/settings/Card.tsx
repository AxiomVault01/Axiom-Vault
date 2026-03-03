import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div
      className={` rounded-xl border border-cardBorder p-6 dark-bg-gray-700 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
