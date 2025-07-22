import { useState, useContext } from 'react';
import {AuthContext}  from '../../Contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password); // Context method calls backend
      navigate('/');                       // Go to home
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" value={name} 
          onChange={e => setName(e.target.value)} 
          placeholder="Name" required 
        />
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
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default Register;