// components/ui/badge.tsx
import React from "react";
import clsx from "clsx";

interface BadgeProps {
  text: string;
  className?: string;
  onClick?: () => void;
}

const Badge: React.FC<BadgeProps> = ({ text, className, onClick }) => {
  return (
    <span
      className={clsx(
        "px-3 py-1 rounded-full text-sm font-medium text-white",
        "bg-teal-500 hover:bg-teal-600 transition-colors",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {text}
    </span>
  );
};

export default Badge;
