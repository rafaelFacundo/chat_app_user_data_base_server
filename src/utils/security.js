import bcrypt from "bcrypt";

export const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(20);
  // encripted password
  return await bcrypt.hash(password, salt);
};

export const comparePasswords = async (passwordInputed, passwordEncrypted) => {
  // comparing the passwords
  return await bcrypt.compare(passwordInputed, passwordEncrypted);
};
