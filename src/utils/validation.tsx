const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*\.com$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{7,}$/;

export const isValidEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const isValidPassword = (password: string): boolean => {
  return PASSWORD_REGEX.test(password);
};
