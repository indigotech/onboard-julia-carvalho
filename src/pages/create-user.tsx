import React, { useState } from "react";
import { UserFormData, ValidateFields } from "../utils/validation";
import { useNavigate } from "react-router";
import { apiClient } from "../services/api";
import { CustomButton } from "../components/custom-button";
import { formField, title, header } from "../styles/global.style";

export const CreateUser = () => {
  const [formData, setFormData] = useState<UserFormData>({
    email: "",
    password: "",
    name: "",
    phone: "",
    birthDate: null,
    role: "user",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof UserFormData, string>>
  >({});
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const handleChange = <K extends keyof UserFormData>(
    field: K,
    value: UserFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateUser = async () => {
    const { isValid, errors: validationErrors } = ValidateFields(formData);
    setErrors(validationErrors);

    if (isValid) {
      try {
        await apiClient.post("/users", {
          ...formData,
          birthDate: formData.birthDate?.toISOString().split("T")[0],
        });

        navigate("/user-list");
      } catch (error: any) {
        const apiErrorMessage = error?.response?.data?.errors?.[0]?.message;

        if (apiErrorMessage) {
          setApiError(apiErrorMessage);
        } else {
          setApiError("Erro inesperado. Tente novamente.");
        }
      }
    }
  };

  return (
    <>
      <div className={header()}>
        <h1 className={title()}>Informe os dados do novo usuário</h1>
      </div>
      <div className={formField().container()}>
        <p className={formField({ error: !!errors.email }).label()}>E-mail</p>
        <input
          type="email"
          value={formData.email}
          placeholder="Digite o e-mail"
          className={formField({ error: !!errors.email }).input()}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        {errors.email && (
          <p className={formField().errorText()}>{errors.email}</p>
        )}
      </div>

      <div className={formField().container()}>
        <p className={formField({ error: !!errors.name }).label()}>Nome</p>
        <input
          type="text"
          value={formData.name}
          placeholder="Digite o nome"
          minLength={6}
          className={formField({ error: !!errors.name }).input()}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        {errors.name && (
          <p className={formField().errorText()}>{errors.name}</p>
        )}
      </div>

      <div className={formField().container()}>
        <p className={formField({ error: !!errors.phone }).label()}>Telefone</p>
        <input
          type="text"
          value={formData.phone}
          placeholder="Digite o telefone"
          minLength={10}
          className={formField({ error: !!errors.phone }).input()}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
        {errors.phone && (
          <p className={formField().errorText()}>{errors.phone}</p>
        )}
      </div>

      <div className={formField().container()}>
        <p className={formField({ error: !!errors.birthDate }).label()}>
          Data de Nascimento
        </p>
        <input
          type="date"
          value={
            formData.birthDate
              ? formData.birthDate.toISOString().split("T")[0]
              : ""
          }
          className={formField({ error: !!errors.birthDate }).input()}
          onChange={(e) => {
            const date = new Date(e.target.value);
            handleChange("birthDate", date);
          }}
        />
        {errors.birthDate && (
          <p className={formField().errorText()}>{errors.birthDate}</p>
        )}
      </div>

      <div className={formField().container()}>
        <p className={formField({ error: !!errors.password }).label()}>Senha</p>
        <input
          type="password"
          value={formData.password}
          placeholder="Digite sua senha"
          minLength={6}
          className={formField({ error: !!errors.password }).input()}
          onChange={(e) => handleChange("password", e.target.value)}
        />
        {errors.password && (
          <p className={formField().errorText()}>{errors.password}</p>
        )}
      </div>

      <div className={formField().container()}>
        <p className={formField({ error: false }).label()}>
          Escolha a função do usuário
        </p>
        <select
          value={formData.role}
          onChange={(e) => handleChange("role", e.target.value)}
          className={formField({ error: false }).select()}
        >
          <option value="user">Usuário</option>
          <option value="admin">Administrador</option>
        </select>
      </div>

      {apiError && <p className={formField().errorText()}>{apiError}</p>}

      <div className={formField().container()}>
        <CustomButton title="Criar" onClick={handleCreateUser} />
      </div>
    </>
  );
};
