import React from "react";

const SpinnerStyle = {
  width: "16px",
  height: "16px",
  border: "2px solid white",
  borderTop: "2px solid transparent",
  borderRadius: "50%",
  animation: "spin 0.6s linear infinite",
};

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
      <div style={SpinnerStyle}></div>
      <style>{SpinnerKeyframes}</style>
    </>
  );
};
