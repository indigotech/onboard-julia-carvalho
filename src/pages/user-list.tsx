import React, { useEffect, useState } from "react";
import { UserCard } from "../components/users/user-card";
import { apiClient } from "../services/api";

interface User {
  id: string;
  name: string;
  email: string;
}

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await apiClient.get("/users").then((response) => {
          const userList = response?.data?.data?.nodes ?? [];
          setUsers(userList);
        });
      } catch (err: any) {
        setError("Erro ao carregar usuários. Verifique o login e o token.");
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {users.map((user) => (
        <UserCard key={user.id} userEmail={user.email} userName={user.name} />
      ))}
    </div>
  );
};
