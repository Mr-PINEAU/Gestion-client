// app.js
const express = require('express');
const cors = require('cors');


const userRoutes = require('./routes/clients');


const app = express();


// Middlewares
app.use(cors()); // permet au frontend (différent port) d'appeler l'API
app.use(express.json()); // parse le JSON du body


// Routes
app.use('/api/clients', userRoutes);


// Route racine optionnelle
app.get('/', (req, res) => {
res.send('API is running');
});


module.exports = app;