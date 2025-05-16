const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*\.com(\.br)?$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{7,}$/;
const NAME_REGEX = /^[A-Za-zÀ-ÿ]+(?:\s+[A-Za-zÀ-ÿ]+)+$/;
const PHONE_REGEX = /^\d{10,11}$/;
const ROLE_REGEX = /^(user|admin)$/;

export const isValidEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const isValidPassword = (password: string): boolean => {
  return PASSWORD_REGEX.test(password);
};

export const isValidName = (name: string): boolean => {
  return NAME_REGEX.test(name);
};

export const isValidPhone = (phone: string): boolean => {
  return PHONE_REGEX.test(phone);
};

export const isValidRole = (role: string): boolean => {
  return ROLE_REGEX.test(role);
};

export const isValidBirthDate = (dateStr: Date) => {
  const date = new Date(dateStr);
  const today = new Date();
  const minDate = new Date("1900-01-01");

  return !isNaN(date.getTime()) && date <= today && date >= minDate;
};

export interface UserFormData {
  email: string;
  password: string;
  name: string;
  phone: string;
  birthDate: Date | null;
  role: string;
}

export interface ValidationErrors {
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
  birthDate?: string;
  role?: string;
}

export const ValidateFields = (
  data: UserFormData,
): { isValid: boolean; errors: ValidationErrors } => {
  const errors: ValidationErrors = {};
  let isValid = true;

  if (!isValidEmail(data.email)) {
    errors.email =
      "Seu e-mail deve ter o formato usuario@dominio.com ou usuario@dominio.com.br. Tente novamente.";
    isValid = false;
  }
  if (!isValidPassword(data.password)) {
    errors.password =
      "Sua senha deve conter pelo menos 7 caracteres, com letras e números. Tente novamente.";
    isValid = false;
  }
  if (!isValidName(data.name)) {
    errors.name =
      "Seu nome deve conter pelo menos 2 palavras e apenas letras. Tente novamente.";
    isValid = false;
  }
  if (!isValidPhone(data.phone)) {
    errors.phone =
      "Seu telefone deve conter apenas números e ter entre 10 e 11 dígitos. Tente novamente.";
    isValid = false;
  }
  if (!data.birthDate || !isValidBirthDate(data.birthDate)) {
    errors.birthDate =
      "Sua data de nascimento deve ser uma data válida e não pode ser maior que a data atual. Tente novamente.";
    isValid = false;
  }

  return { isValid, errors };
};
