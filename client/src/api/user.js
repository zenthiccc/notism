import axios from "axios";

export const userRegister = (userName, userEmail, userPassword) =>
  axios.post("/users/register", {
    username: userName,
    email: userEmail,
    password: userPassword,
  });

export const userLogin = (userEmail, userPassword) =>
  axios.post("/users/login", {
    email: userEmail,
    password: userPassword,
  });

export const userVerify = (token) =>
  axios.get("/users/verify", {
    headers: { Authorization: token },
  });
