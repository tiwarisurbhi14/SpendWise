import { useState, useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);  
      navigate('/');              
    } catch (err) {
      alert('Login failed',err);
    }
  };

  return (
    <LoginStyled>
      <div className="login-content">
        <h2>Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-control">
            <input 
              type="email"
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="Email"
              required 
            />
          </div>
          <div className="input-control">
            <input 
              type="password"
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="Password"
              required 
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <div className="register-link">
          <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
      </div>
    </LoginStyled>
  );
}

const LoginStyled = styled.div`
  height: 100vh;
  background: rgba(252, 246, 249, 0.78);
  display: flex;
  align-items: center;
  justify-content: center;

  .login-content {
    background: white;
    border-radius: 20px;
    padding: 3rem;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    width: 360px;

    h2 {
      color: rgba(34, 34, 96, 1);
      text-align: center;
      margin-bottom: 2rem;
      font-size: 1.8rem;
    }

    .input-control {
      margin-bottom: 1rem;
      
      input {
        width: 100%;
        padding: 0.8rem;
        border: 2px solid #fff;
        border-radius: 10px;
        font-size: 1rem;
        background: rgba(252, 246, 249, 0.78);
        outline: none;
        transition: all 0.3s ease;

        &:focus {
          border: 2px solid rgba(34, 34, 96, 0.4);
        }
      }
    }

    button {
      width: 100%;
      padding: 0.8rem;
      background: rgba(34, 34, 96, 1);
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: rgba(34, 34, 96, 0.8);
        transform: translateY(-2px);
      }

      &:active {
        transform: translateY(0);
      }
    }

    .register-link {
      text-align: center;
      margin-top: 1.5rem;
      
      p {
        color: rgba(34, 34, 96, 0.6);
      }

      a {
        color: rgba(34, 34, 96, 1);
        text-decoration: none;
        font-weight: 600;
        transition: all 0.3s ease;

        &:hover {
          color: rgba(34, 34, 96, 0.8);
        }
      }
    }
  }
`;

export default Login;