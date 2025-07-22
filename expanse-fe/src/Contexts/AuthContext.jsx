import { createContext, useState, useEffect } from 'react';
import axios from '../utils/api'; 

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);  
  
  useEffect(() => {
    axios.get('/auth/me')
      .then(res => setUser(res.data.user))
      .catch(() => setUser(null)); 
  }, []);

  const login = async (email, password) => {
    const res = await axios.post('/auth/login', { email, password });
    setUser(res.data.user);
  };

  const register = async (name, email, password) => {
    const res = await axios.post('/auth/register', { name, email, password });
    setUser(res.data.user);
  };

  const logout = async () => {
    await axios.post('/auth/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}