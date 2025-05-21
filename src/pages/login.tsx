import React, { useState } from "react";
import { useNavigate } from "react-router";
import { isValidEmail, isValidPassword } from "../utils/validation";
import { apiClient } from "../services/api";
import { CustomButton } from "../components/custom-button";
import { formField, title, header } from "../styles/global.style";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    let valid = true;

    if (!isValidEmail(email)) {
      setEmailError(
        "Seu e-mail deve ter o formato usuario@dominio.com ou usuario@dominio.com.br. Tente novamente.",
      );
      valid = false;
    } else {
      setEmailError("");
    }

    if (!isValidPassword(password)) {
      setPasswordError(
        "Sua senha deve conter pelo menos 7 caracteres, com letras e números. Tente novamente.",
      );
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      setApiError("");
      setLoading(true);

      try {
        const response = await apiClient.post("/authenticate", {
          email,
          password,
        });
        localStorage.setItem("token", response.data.data.token);
        navigate("/user-list");
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
    }
  };

  return (
    <>
      <div className={header()}>
        <h1 className={title()}>Bem-vindo(a) à Taqtile!</h1>
      </div>
      <div className={formField().container()}>
        <p className={formField({ error: !!emailError }).label()}>E-mail</p>
        <input
          type="email"
          value={email}
          placeholder="Digite seu e-mail"
          onChange={(e) => setEmail(e.target.value)}
          className={formField({ error: !!emailError }).input()}
        />
        {emailError && <p className={formField().errorText()}>{emailError}</p>}
      </div>

      <div className={formField().container()}>
        <p className={formField({ error: !!passwordError }).label()}>Senha</p>
        <input
          type="password"
          value={password}
          placeholder="Digite sua senha"
          minLength={6}
          onChange={(e) => setPassword(e.target.value)}
          className={formField({ error: !!passwordError }).input()}
        />
        {passwordError && (
          <p className={formField().errorText()}>{passwordError}</p>
        )}
      </div>

      {apiError && <p className={formField().errorText()}>{apiError}</p>}

      <div className={formField().container()}>
        <CustomButton
          title="Entrar"
          onClick={handleLogin}
          loading={loading}
          spinner
        />
      </div>
    </>
  );
};
