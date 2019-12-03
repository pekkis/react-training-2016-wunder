import axios from "axios";

const login = async (email, password) => {
  const ret = await axios.post(`${process.env.REACT_APP_API}/auth`, {
    email,
    password
  });
  return [ret.headers["x-auth-token"], ret.data];
};

export default {
  login
};