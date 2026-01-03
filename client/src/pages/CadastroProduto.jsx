import { useState } from 'react';
import api from '../services/api';
import './CadastroProduto.css';

const CadastroProduto = () => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    imagem: '',
    categoria: '',
    estoque: 10
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/produtos', formData);
      alert('Produto cadastrado com sucesso! 🐉');
      
      setFormData({
        nome: '',
        descricao: '',
        preco: '',
        imagem: '',
        categoria: '',
        estoque: 10
      });
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar. O Backend está ligado?');
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Painel Admin: Novo Produto</h2>
      
      <form onSubmit={handleSubmit} className="form-cadastro">
        
        <label>Nome do Produto:</label>
        <input name="nome" value={formData.nome} onChange={handleChange} required placeholder="Ex: Nike Dunk Low" />

        <label>Preço (R$):</label>
        <input name="preco" type="number" value={formData.preco} onChange={handleChange} required placeholder="Ex: 999.90" />

        <label>URL da Imagem:</label>
        <input name="imagem" value={formData.imagem} onChange={handleChange} required placeholder="Cole o link da foto aqui" />
        
        {formData.imagem && <img src={formData.imagem} alt="Preview" className="preview-img" />}

        <label>Categoria:</label>
        <select name="categoria" value={formData.categoria} onChange={handleChange} required>
          <option value="">Selecione...</option>
          <option value="Destaques">Destaques</option>
          <option value="Pronta Entrega">Pronta Entrega</option>
          <option value="Catalogo">Catálogo</option>
        </select>

        <label>Descrição:</label>
        <textarea name="descricao" value={formData.descricao} onChange={handleChange} rows="3" />

        <button type="submit">CADASTRAR PRODUTO</button>
      </form>
    </div>
  );
};

export default CadastroProduto;