import React, { useState } from "react";
import {
  isValidEmail,
  isValidPassword,
  isValidName,
  isValidPhone,
  isValidBirthDate,
} from "../utils/validation";
import { useNavigate } from "react-router";

export const CreateUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [birthDateError, setBirthDateError] = useState("");
  const navigate = useNavigate();

  const handleCreateUser = () => {
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

    if (!isValidName(name)) {
      setNameError(
        "Seu nome deve conter pelo menos 2 palavras e apenas letras. Tente novamente.",
      );
      valid = false;
    } else {
      setNameError("");
    }

    if (!isValidPhone(phone)) {
      setPhoneError(
        "Seu telefone deve conter apenas números e ter entre 10 e 11 dígitos. Tente novamente.",
      );
      valid = false;
    } else {
      setPhoneError("");
    }

    if (!birthDate || !isValidBirthDate(birthDate)) {
      setBirthDateError(
        "Sua data de nascimento deve ser uma data válida e não pode ser maior que a data atual. Tente novamente.",
      );
      valid = false;
    } else {
      setBirthDateError("");
    }

    if (valid) {
      navigate("/user-list");
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
          value={email}
          placeholder="Digite o e-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p>{emailError}</p>}
      </div>

      <div className="NameInput">
        <p>Nome</p>
        <input
          type="name"
          value={name}
          placeholder="Digite o nome"
          minLength={6}
          onChange={(e) => setName(e.target.value)}
        />
        {nameError && <p>{nameError}</p>}
      </div>

      <div className="PhoneInput">
        <p>Telefone</p>
        <input
          type="phone"
          value={phone}
          placeholder="Digite o telefone"
          minLength={10}
          onChange={(e) => setPhone(e.target.value)}
        />
        {phoneError && <p>{phoneError}</p>}
      </div>

      <div className="BirthDateInput">
        <p>Data de Nascimento</p>
        <input
          type="date"
          value={birthDate ? birthDate.toISOString().split("T")[0] : ""}
          onChange={(e) => {
            const date = new Date(e.target.value);
            setBirthDate(date);
          }}
        />
        {birthDateError && <p>{birthDateError}</p>}
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

      <div className="RoleInput">
        <p>Escolha a função do usuário</p>
        <select>
          <option value="user">Usuário</option>
          <option value="admin">Administrador</option>
        </select>
      </div>
      <div>
        {" "}
        <button onClick={handleCreateUser}>Criar</button>
      </div>
    </>
  );
};
