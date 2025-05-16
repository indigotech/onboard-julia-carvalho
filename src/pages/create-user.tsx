import React, { useState } from "react";
import { UserFormData, ValidateFields } from "../utils/validation";
import { useNavigate } from "react-router";
import { apiClient } from "../services/api";

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
      <div className="Heading">
        <h1>Informe os dados do novo usuário:</h1>
      </div>
      <div className="EmailInput">
        <p>E-mail</p>
        <input
          type="email"
          value={formData.email}
          placeholder="Digite o e-mail"
          onChange={(e) => handleChange("email", e.target.value)}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>

      <div className="NameInput">
        <p>Nome</p>
        <input
          type="name"
          value={formData.name}
          placeholder="Digite o nome"
          minLength={6}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        {errors.name && <p>{errors.name}</p>}
      </div>

      <div className="PhoneInput">
        <p>Telefone</p>
        <input
          type="phone"
          value={formData.phone}
          placeholder="Digite o telefone"
          minLength={10}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
        {errors.phone && <p>{errors.phone}</p>}
      </div>

      <div className="BirthDateInput">
        <p>Data de Nascimento</p>
        <input
          type="date"
          value={
            formData.birthDate
              ? formData.birthDate.toISOString().split("T")[0]
              : ""
          }
          onChange={(e) => {
            const date = new Date(e.target.value);
            handleChange("birthDate", date);
          }}
        />
        {errors.birthDate && <p>{errors.birthDate}</p>}
      </div>

      <div className="PasswordInput">
        <p>Senha</p>
        <input
          type="password"
          value={formData.password}
          placeholder="Digite sua senha"
          minLength={6}
          onChange={(e) => handleChange("password", e.target.value)}
        />
        {errors.password && <p>{errors.password}</p>}
      </div>

      <div className="RoleInput">
        <p>Escolha a função do usuário</p>
        <select
          value={formData.role}
          onChange={(e) => handleChange("role", e.target.value)}
        >
          <option value="user">Usuário</option>
          <option value="admin">Administrador</option>
        </select>
      </div>
      {apiError && <p>{apiError}</p>}
      <div>
        <button onClick={handleCreateUser}>Criar</button>
      </div>
    </>
  );
};
