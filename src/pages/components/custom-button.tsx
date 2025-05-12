import React from "react";
import { Spinner } from "./spinner";

interface ButtonProps {
  title: string;
  onClick: () => void;
  loading?: boolean;
}

export const CustomButton: React.FC<ButtonProps> = ({
  title,
  onClick,
  loading,
}) => {
  return (
    <button
      className="bg-red-500 text-white px-4 py-2"
      onClick={onClick}
      disabled={loading}
      style={{
        width: "150px",
        height: "48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading && (
        <div
          style={{
            position: "absolute",
            left: "16px",
          }}
        >
          {" "}
          <Spinner />{" "}
        </div>
      )}
      {title}
    </button>
  );
};
