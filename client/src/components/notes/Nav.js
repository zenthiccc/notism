import React from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export default function Nav({ setIsLogin }) {
  const logoutSubmit = () => {
    localStorage.clear();
    setIsLogin(false);
  };

  return (
    <header>
      <div className="logo">
        <Typography variant="h2" component={Link} to="/">
          Notism
        </Typography>
      </div>
      <ul>
        <Button component={Link} to="/">
          Home
        </Button>
        <Button component={Link} to="/create">
          Create Note
        </Button>
        <Button
          color="secondary"
          onClick={logoutSubmit}
          component={Link}
          to="/"
        >
          Logout
        </Button>
      </ul>
    </header>
  );
}
