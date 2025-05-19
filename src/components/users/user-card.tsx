import React from "react";

interface UserCardProps {
  userEmail: string;
  userName: string;
  onClick?: () => void;
}

const UserCardStyles: {
  container: React.CSSProperties;
  name: React.CSSProperties;
  email: React.CSSProperties;
} = {
  container: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid #ccc",
    padding: "8px",
    cursor: "pointer",
  },
  name: {
    fontWeight: "bold",
  },
  email: {
    color: "#666",
    fontSize: "14px",
  },
};

export const UserCard: React.FC<UserCardProps> = (props) => {
  const { userName, userEmail, onClick } = props;
  return (
    <div style={UserCardStyles.container} onClick={onClick}>
      <p style={UserCardStyles.name}>{userName}</p>
      <p style={UserCardStyles.email}>{userEmail}</p>
    </div>
  );
};
