import { tv } from "tailwind-variants";

export const userDetails = tv({
  slots: {
    container:
      "flex flex-col gap-4 p-6 bg-white rounded shadow max-w-md mx-auto mt-10",
    section: "flex flex-col",
    label: "text-xs text-gray-500 mb-1",
    value: "text-base text-black",
    title: "text-2xl font-bold text-black mb-6 text-center",
  },
});
