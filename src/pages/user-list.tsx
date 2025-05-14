import React, { useEffect, useState } from "react";
import { UserCard } from "../components/users/user-card";

interface User {
  name: string;
  email: string;
}

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("/user-data.json")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      {users.map((user, index) => (
        <UserCard key={index} userEmail={user.email} userName={user.name} />
      ))}
    </div>
  );
};
