import React from "react";
import { tv } from "tailwind-variants";

export const spinner = tv({
  base: "w-[16px] h-[16px] border-2 border-white border-t-transparent rounded-full animate-spin",
});

const SpinnerKeyframes = `
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  `;

export const Spinner = () => {
  return (
    <>
      <div className={spinner()}></div>
      <style>{SpinnerKeyframes}</style>
    </>
  );
};
