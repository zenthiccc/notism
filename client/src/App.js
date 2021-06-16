import React, { useState, useEffect, useMemo } from "react";
import Login from "./components/Login";
import Notes from "./components/Notes";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { userVerify } from "./api/user";

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
        const verified = await userVerify(token);
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
