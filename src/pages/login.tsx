import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      </div>
      <div className="PasswordInput">
        <p>Senha</p>
        <input
          type="password"
          value={password}
          placeholder="Digite sua senha"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button>Entrar</button>
    </>
  );
};

export default Login;
