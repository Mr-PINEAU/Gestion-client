const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware (pour gérer le JSON et autoriser le frontend)
app.use(cors());
app.use(express.json());

// Données simulées (en mémoire)
let clients = [
    { id: 1, name: 'Alice', email: 'alice@example.com', password: '12345' },
    { id: 2, name: 'Bob', email: 'bob@example.com', password: '123456' },
    { id: 3, name: 'Bernard', email: 'bernard@gmail.com', password: '1234567' },
    { id: 4, name: 'Rene', email: 'rene@example.com', password: '12345678' },
    { id: 5, name: 'Thierry', email: 'thierry@gmail.com', password: '123456789' }
];

// Routes API

// 👉 Afficher tout les clients
app.get('/api/clients', (_req, res) => {
    res.json(clients);
});

// 👉 Ajouter un client
app.post('/api/clients', (req, res) => {
    const newClient = { 
    id: Date.now(), 
    name: req.body.name,
    email: req.body.email
   };
    clients.push(newClient);
    res.status(201).json(newClient);
});

// 👉 Supprimer un client
app.delete('/api/clients/:id', (req, res) => {
    const id = parseInt(req.params.id);
    clients = clients.filter(client => client.id !== id);
    res.status(204).send();
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`✅ Serveur backend démarré sur http://localhost:${PORT}`);
});
