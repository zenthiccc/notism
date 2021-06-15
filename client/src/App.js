import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Login from "./components/Login";
import Notes from "./components/Notes";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  const theme = useMemo(() =>
    createMuiTheme({
      palette: {
        type: "light",
      },
    })
  );

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const verified = await axios.get("/users/verify", {
          headers: { Authorization: token },
        });
        console.log(verified);
        setIsLogin(verified.data);
        if (verified.data === false) return localStorage.clear();
      } else {
        setIsLogin(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {isLogin ? (
          <Notes setIsLogin={setIsLogin} />
        ) : (
          <Login setIsLogin={setIsLogin} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
