import React, { useCallback, useEffect, useState } from "react";
import { UserCard } from "../components/users/user-card.component";
import { apiClient } from "../services/api";
import { InfiniteScroll } from "../components/infinite-scroll";
import { CustomButton } from "../components/custom-button";
import { useNavigate } from "react-router";
import { title, header } from "../styles/global.style";

interface User {
  id: string;
  name: string;
  email: string;
}

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    if (!token || loading || !hasMore) {
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.get("/users", {
        params: { offset, limit: 10 },
      });

      const userList: User[] = response?.data?.data?.nodes ?? [];

      setUsers((prev) => [...prev, ...userList]);

      setHasMore(response.data.data.pageInfo.hasNextPage);
      setOffset((prev) => prev + 10);
    } catch {
      setError("Erro Inesperado.");
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [offset, hasMore, loading, token]);

  useEffect(() => {
    if (!token) {
      setError("Erro ao carregar usuários. Verifique o login e o token.");
      setHasMore(false);
      return;
    }
  }, [token]);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <div className={header()}>
            <div className={title()}>Lista de Usuários</div>
            <CustomButton
              title="Criar um novo usuário"
              onClick={() => navigate("/create-user")}
            />
          </div>

          {users.map((user) => (
            <UserCard
              key={user.id}
              userEmail={user.email}
              userName={user.name}
              onClick={() => {
                navigate(`/user/${user.id}`);
              }}
            />
          ))}

          <InfiniteScroll
            loadMore={fetchUsers}
            hasMore={hasMore}
            loading={loading}
          />
          {loading && <p>Carregando usuários...</p>}
        </>
      )}
    </div>
  );
};
