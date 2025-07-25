import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./Contexts/AuthContext";
import { useContext } from "react";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import AppLayout from "./Components/AppLayout/AppLayout";
import axios from "axios";

function App() {
  const { user } =useContext(AuthContext);
  console.log("Axios baseURL:", axios.defaults.baseURL);


  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? (
            <AppLayout />
          ) : (
            <Navigate to="/login" replace />
          )}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" replace />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;