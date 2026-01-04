import { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

const Admin = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/auth/login', { senha: passwordInput });
      setIsLogged(true);
    } catch (error) {
      alert('Senha incorreta! 🚫');
      setPasswordInput('');
    }
  };

  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    imagem: '',
    categoria: 'Encomenda',
    estoque: 1000
  });

  useEffect(() => {
    if (formData.categoria === 'Pronta Entrega') {
      setFormData(prev => ({ ...prev, estoque: 1 }));
    } else {
      setFormData(prev => ({ ...prev, estoque: 1000 }));
    }
  }, [formData.categoria]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/produtos', formData);
      alert('Produto cadastrado com sucesso! 🐉');
      
      setFormData({
        ...formData,
        nome: '',
        descricao: '',
        preco: '',
        imagem: ''
      });
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar.');
    }
  };

  if (!isLogged) {
    return (
      <div className="login-wrapper">
        <div className="login-box">
          <h2>🔒 Acesso Restrito</h2>
          <p>Digite a senha de administrador</p>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              value={passwordInput} 
              onChange={(e) => setPasswordInput(e.target.value)} 
              placeholder="Senha" 
              autoFocus 
            />
            <button type="submit">Entrar</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="cadastro-container">
      <div className="header-painel">
        <h2>Painel Admin 🐉</h2>
        <button onClick={() => setIsLogged(false)} className="btn-sair">Sair</button>
      </div>
      
      <form onSubmit={handleSubmit} className="form-cadastro">
        
        <label>Nome do Produto:</label>
        <input name="nome" value={formData.nome} onChange={handleChange} required placeholder="Ex: Nike Dunk Low" />

        <div className="linha-dupla">
          <div className="campo">
            <label>Preço (R$):</label>
            <input name="preco" type="number" value={formData.preco} onChange={handleChange} required placeholder="999.90" />
          </div>

          <div className="campo">
            <label>Categoria:</label>
            <select name="categoria" value={formData.categoria} onChange={handleChange} required>
              <option value="Encomenda">Encomenda (Catálogo)</option>
              <option value="Pronta Entrega">Pronta Entrega</option>
              <option value="Destaques">Destaques (Home)</option>
            </select>
          </div>
        </div>

        <div className="info-estoque">
          {formData.categoria === 'Pronta Entrega' ? (
            <span className="badge-unico">📦 Item Único (Estoque: 1)</span>
          ) : (
            <span className="badge-infinito">✈️ Encomenda (Estoque Livre)</span>
          )}
        </div>

        <label>URL da Imagem:</label>
        <input name="imagem" value={formData.imagem} onChange={handleChange} required placeholder="https://..." />
        
        {formData.imagem && <img src={formData.imagem} alt="Preview" className="preview-img" />}

        <label>Descrição:</label>
        <textarea name="descricao" value={formData.descricao} onChange={handleChange} rows="3" placeholder="Detalhes, Tamanho BR, etc..." />

        <button type="submit" className="btn-salvar">CADASTRAR</button>
      </form>
    </div>
  );
};

export default Admin;