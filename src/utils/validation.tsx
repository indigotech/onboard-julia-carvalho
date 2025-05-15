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
