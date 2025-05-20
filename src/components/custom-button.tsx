import React from "react";
import { Spinner } from "./spinner";
import { tv } from "tailwind-variants";

interface ButtonProps {
  title: string;
  onClick: () => void;
  loading?: boolean;
  spinner?: boolean;
}

export const button = tv({
  base: `
    text-base font-normal 
    bg-emerald-600
    text-white 
    h-[44px]
    flex items-center justify-center gap-2 
    rounded 
    hover:bg-emerald-700
    disabled:opacity-50
    px-4
  `,
  variants: {
    spinner: {
      true: "w-[150px]",
      false: "w-auto",
    },
  },
  defaultVariants: {
    spinner: false,
  },
});

export const CustomButton: React.FC<ButtonProps> = (props) => {
  const { title, spinner, loading, onClick } = props;
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={button({ spinner })}
    >
      {loading && (
        <div>
          <Spinner />
        </div>
      )}
      {title}
    </button>
  );
};
