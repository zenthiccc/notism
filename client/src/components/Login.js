import React, { useState } from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function Login({ setIsLogin }) {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setError("");
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/register", {
        username: user.name,
        email: user.email,
        password: user.password,
      });
      setUser({ name: "", email: "", password: "" });
      setError(res.data.msg);
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/login", {
        email: user.email,
        password: user.password,
      });
      setUser({ name: "", email: "", password: "" });
      localStorage.setItem("tokenStore", res.data.token);
      setIsLogin(true);
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  const [onLogin, setOnLogin] = useState(false);
  const styleLogin = {
    visibility: onLogin ? "visible" : "hidden",
    opacity: onLogin ? 1 : 0,
  };

  return (
    <Container className="login-page">
      <Typography variant="h4" align="center">
        Welcome to Notism!
      </Typography>
      <Paper className="login create-note">
        <Typography variant="h5">Login</Typography>

        <form onSubmit={loginSubmit}>
          <TextField
            color="secondary"
            type="email"
            name="email"
            id="login-email"
            placeholder="Email"
            required
            value={user.email}
            fullWidth
            onChange={onChangeInput}
          />

          <TextField
            color="secondary"
            type="password"
            name="password"
            id="login-password"
            placeholder="Password"
            required
            value={user.password}
            fullWidth
            autoComplete="true"
            onChange={onChangeInput}
          />

          <Button color="secondary" type="submit">
            Login
          </Button>
          <Typography variant="h6">Don't have an account?</Typography>
          <Button color="secondary" onClick={() => setOnLogin(true)}>
            {" "}
            Register Now
          </Button>

          <Typography variant="h6" align="center" color="error">
            {error}
          </Typography>
        </form>
      </Paper>
      <Paper className="register create-note" style={styleLogin}>
        <Typography variant="h5">Register</Typography>
        <form onSubmit={registerSubmit}>
          <TextField
            color="secondary"
            type="text"
            name="name"
            id="register-name"
            placeholder="User Name"
            required
            value={user.name}
            fullWidth
            onChange={onChangeInput}
          />

          <TextField
            color="secondary"
            type="email"
            name="email"
            id="register-email"
            placeholder="Email"
            required
            value={user.email}
            fullWidth
            onChange={onChangeInput}
          />

          <TextField
            color="secondary"
            type="password"
            name="password"
            id="register-password"
            placeholder="Password"
            required
            value={user.password}
            fullWidth
            autoComplete="true"
            onChange={onChangeInput}
          />

          <Button color="secondary" type="submit">
            Register
          </Button>
          <Typography variant="h6">Have an account?</Typography>
          <Button color="secondary" onClick={() => setOnLogin(false)}>
            {" "}
            Login Now
          </Button>

          <Typography variant="h6" align="center" color="error">
            {error}
          </Typography>
        </form>
      </Paper>
    </Container>
  );
}
