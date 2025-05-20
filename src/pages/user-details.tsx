import React, { useCallback, useEffect, useState } from "react";
import { apiClient } from "../services/api";
import { CustomButton } from "../components/custom-button";
import { useParams, useNavigate } from "react-router";
import { userDetails } from "../styles/user-details.style";
import { header, title } from "../styles/global.style";

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
  const styles = userDetails();

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
          <div className={header()}>
            <div className={title()}>Detalhes do Usuário</div>
            <CustomButton
              title="Voltar para a lista de usuários"
              onClick={() => navigate("/user-list")}
            />
          </div>

          {user.map((user) => (
            <div key={user.id} className={styles.container()}>
              <div className={styles.section()}>
                <p className={styles.label()}>ID</p>
                <p className={styles.value()}>{user.id}</p>
              </div>

              <div className={styles.section()}>
                <p className={styles.label()}>E-mail</p>
                <p className={styles.value()}>{user.email}</p>
              </div>

              <div className={styles.section()}>
                <p className={styles.label()}>Nome</p>
                <p className={styles.value()}>{user.name}</p>
              </div>

              <div className={styles.section()}>
                <p className={styles.label()}>Telefone</p>
                <p className={styles.value()}>{user.phone}</p>
              </div>

              <div className={styles.section()}>
                <p className={styles.label()}>Data de Nascimento</p>
                <p className={styles.value()}>
                  {new Date(user.birthDate).toLocaleDateString("pt-BR")}
                </p>
              </div>

              <div className={styles.section()}>
                <p className={styles.label()}>Função</p>
                <p className={styles.value()}>
                  {user.role === "user"
                    ? "Usuário"
                    : user.role === "admin"
                      ? "Administrador"
                      : user.role}
                </p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
