import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/api'; 

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    axios.get('/auth/me')
      .then(res => {
        setUser(res.data.user);
        if (res.data.user) navigate('/dashboard'); 
      })
      .catch(() => setUser(null));
  }, []);

  const login = async (email, password) => {
    const res = await axios.post('/auth/login', { email, password });
    setUser(res.data.user);
    navigate('/dashboard');
  };

  const register = async (name, email, password) => {
    const res = await axios.post('/auth/register', { name, email, password });
    setUser(res.data.user);
    navigate('/dashboard'); 
  };

  const logout = async () => {
    await axios.post('/auth/logout');
    setUser(null);
    navigate('/login'); 
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}