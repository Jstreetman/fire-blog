import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const MaxWidthWrapper = ({ children, className = "" }: Props) => {
  return (
    <div className={twMerge("mx-auto max-w-7xl px-4 md:px-8", className)}>
      {children}
    </div>
  );
};
