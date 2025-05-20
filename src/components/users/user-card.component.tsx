import React from "react";
import { tv } from "tailwind-variants";

interface UserCardProps {
  userEmail: string;
  userName: string;
  onClick?: () => void;
}

export const userCard = tv({
  slots: {
    container:
      "flex flex-row border border-gray-300 p-2 cursor-pointer justify-between px-10 hover:bg-blue-100 ",
    name: "font-bold text-gray-700",
    email: "text-gray-500 text-sm",
  },
});

export const UserCard: React.FC<UserCardProps> = (props) => {
  const { userName, userEmail, onClick } = props;
  const styles = userCard();
  return (
    <div className={styles.container()} onClick={onClick}>
      <p className={styles.name()}>{userName}</p>
      <p className={styles.email()}>{userEmail}</p>
    </div>
  );
};
