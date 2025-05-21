import { tv } from "tailwind-variants";

export const title = tv({
  base: "text-[24px] font-bold text-white mt-5 mb-5",
});

export const header = tv({
  base: "flex items-center justify-between sticky top-0 px-8 bg-black",
});

export const formField = tv({
  slots: {
    container: "flex flex-col mb-5 py-2 px-8 justify-center",
    label: "text-[16px] font-normal text-[#777777] mb-3",
    input: "border-b border-[#777777] text-black outline-none pb-1",
    select: "border border-[#777777] rounded p-2 text-black outline-none",
    errorText: "text-[16px] font-normal text-red-500 mt-2",
  },
  variants: {
    error: {
      true: {
        label: "text-red-500",
        input: "border-red-500 text-red-500",
        select: "border-red-500 text-red-500",
      },
    },
  },
  defaultVariants: {
    error: false,
  },
});
