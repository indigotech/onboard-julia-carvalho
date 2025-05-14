import React from "react";
import { Spinner } from "./spinner";

interface ButtonProps {
  title: string;
  onClick: () => void;
  loading?: boolean;
}

const CustomButtonStyle: React.CSSProperties = {
  width: "150px",
  height: "48px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const CustomButton: React.FC<ButtonProps> = (props) => {
  const { title, loading, onClick } = props;
  return (
    <button onClick={onClick} disabled={loading} style={CustomButtonStyle}>
      {loading && (
        <div>
          <Spinner />
        </div>
      )}
      {title}
    </button>
  );
};
