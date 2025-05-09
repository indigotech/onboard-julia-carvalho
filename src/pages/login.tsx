import React, { useState } from "react";
import { isValidEmail, isValidPassword } from "../utils/validation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = () => {
    let Valid = true;

    if (!isValidEmail(email)) {
      setEmailError(
        "Seu e-mail deve ter o formato usuario@dominio.com. Tente novamente.",
      );
      Valid = false;
    } else {
      setEmailError("");
    }

    if (!isValidPassword(password)) {
      setPasswordError(
        "Sua senha deve conter pelo menos 7 caracteres, com letras e números. Tente novamente.",
      );
      Valid = false;
    } else {
      setPasswordError("");
    }

    if (Valid) {
      console.log("Login válido!");
      //TO DO
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
      <button onClick={handleLogin}>Entrar</button>
    </>
  );
};

export default Login;
