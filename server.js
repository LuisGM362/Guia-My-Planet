const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/opciones', (req, res) => {
  res.json(["Guia de Inicio", "Guia de Consulta", "Guia de Victoria"]);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});