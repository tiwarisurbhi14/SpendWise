// src/components/Login.jsx
import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);  // Context method calls backend
      navigate('/');                // Go to home on success
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" value={email} 
          onChange={e => setEmail(e.target.value)} 
          placeholder="Email" required 
        />
        <input 
          type="password" value={password} 
          onChange={e => setPassword(e.target.value)} 
          placeholder="Password" required 
        />
        <button type="submit">Log In</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
}

export default Login;