import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext'; 
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AuthRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const { user, authLoading } = useContext(AuthContext);

  if (authLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/login" 
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />
        <Route 
          path="/register" 
          element={
            <AuthRoute>
              <Register />
            </AuthRoute>
          }
        />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;