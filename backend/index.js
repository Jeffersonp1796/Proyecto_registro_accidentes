const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const eventosRoutes = require('./routes/eventosRoutes');
app.use('/api/eventos', eventosRoutes);

app.listen(3001, () => {
  console.log('Servidor backend en puerto 3001');
});
