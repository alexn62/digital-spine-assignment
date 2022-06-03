import { User } from '../db/models/user.model';

const validateEmail = (email: string) => {
  let regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};

const validatePassword = (password: string) => {
  return password.length >= 8;
};

const userExists = async (email: string) => {
  const user = await User.findOne({ email });
  return user !== null;
};

export default {
  validateEmail,
  validatePassword,
  userExists,
};
