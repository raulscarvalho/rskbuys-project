import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';

const LoginAdmin = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/auth/login', { senha: password });
      
      localStorage.setItem('rsk-admin-token', 'true');
      
      navigate('/admin');
      
    } catch (error) {
      alert('Senha incorreta! Tente de novo. 🚫');
      setPassword('');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>🔒 Área Restrita RSK</h2>
        <p>Apenas pessoal autorizado</p>
        <form onSubmit={handleLogin}>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Digite a senha..." 
            autoFocus 
          />
          <button type="submit" className="btn-salvar">Acessar Painel</button>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;