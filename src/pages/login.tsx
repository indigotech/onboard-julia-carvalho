import React, { useState } from "react";
import { isValidEmail, isValidPassword } from "../utils/validation";
import { apiClient } from "../services/api";
import { CustomButton } from "./components/custom-button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

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
      <div className="Heading">
        <h1>Bem-vindo(a) à Taqtile!</h1>
      </div>
      <div className="EmailInput">
        <p>E-mail</p>
        <input
          type="email"
          value={email}
          placeholder="Digite seu e-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p>{emailError}</p>}
      </div>
      <div className="PasswordInput">
        <p>Senha</p>
        <input
          type="password"
          value={password}
          placeholder="Digite sua senha"
          minLength={6}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <p>{passwordError}</p>}
      </div>
      {apiError && <p>{apiError}</p>}
      <div>
        <CustomButton title="Entrar" onClick={handleLogin} loading={loading} />
      </div>
    </>
  );
};

export default Login;
