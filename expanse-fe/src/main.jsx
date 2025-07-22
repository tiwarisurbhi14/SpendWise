import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalStyle } from "./styles/GlobalStyle";
import { GlobalProvider } from "./Components/context/globalContext";
import { AuthProvider } from "./Contexts/AuthContext";
import "@fortawesome/fontawesome-free/css/all.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <GlobalStyle />
    <AuthProvider>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </AuthProvider>
  </>
);
