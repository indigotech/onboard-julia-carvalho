import React, { useCallback, useEffect, useState } from "react";
import { apiClient } from "../services/api";
import { CustomButton } from "../components/custom-button";
import { useParams, useNavigate } from "react-router";

interface UserDetailsProps {
  id: string;
  email: string;
  name: string;
  phone: string;
  birthDate: Date;
  role: string;
}

export const UserDetails = () => {
  const [user, setUser] = useState<UserDetailsProps[]>([]);
  const [apiError, setApiError] = useState("");
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUser = useCallback(async () => {
    setLoading(true);

    try {
      const response = await apiClient.get(`/users/${id}`);
      const userDetails: UserDetailsProps = response?.data?.data ?? null;
      setUser([userDetails]);
    } catch (error: any) {
      const apiErrorMessage = error?.response?.data?.errors?.[0]?.message;

      if (apiErrorMessage) {
        setApiError(apiErrorMessage);
      } else {
        setApiError("Erro inesperado. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div>
      {loading ? (
        <p>Carregando...</p>
      ) : apiError ? (
        <p>{apiError}</p>
      ) : (
        <>
          <h1>Detalhes do Usuário</h1>
          {user.map((user) => (
            <div key={user.id}>
              <p>ID: {user.id}</p>
              <p>E-mail: {user.email}</p>
              <p>Nome: {user.name}</p>
              <p>Telefone: {user.phone}</p>
              <p>Data de nascimento: {user.birthDate.toString()}</p>
              <p>
                Função:{" "}
                {user.role === "user"
                  ? "Usuário"
                  : user.role === "admin"
                    ? "Administrador"
                    : user.role}
              </p>
            </div>
          ))}
        </>
      )}
      {!loading && (
        <div>
          <CustomButton
            title="Voltar para a lista de usuários"
            onClick={() => navigate("/user-list")}
          />
        </div>
      )}
    </div>
  );
};
