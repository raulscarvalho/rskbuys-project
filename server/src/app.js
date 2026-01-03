require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const produtoRoutes = require('./routes/produtoRoutes');

console.log("Iniciando o servidor...");

const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI; 

console.log("Tentando conectar ao banco...");

mongoose.connect(MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB Atlas com sucesso!'))
  .catch((err) => console.error('Erro ao conectar no MongoDB:', err));

app.use('/api/produtos', produtoRoutes);

app.get('/', (req, res) => {
  res.send('API RSKBuys rodando!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});