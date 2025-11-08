// controllers/clientController.js
const Client = require('../models/Model');


// GET /api/clients
function getClients(req, res) {
    const clients = Client.findAll();
    res.json(clients);
}


// GET /api/clients/:id
function getClient(req, res) {
    const id = Number(req.params.id);
    const client = Client.findById(id);
    if (!client) return res.status(404).json({ message: 'Client non trouvé !' });
    res.json(client);
}


// POST /api/clients
function createClient(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password ) return res.status(400).json({ message: 'Nom ou email ou password manquant' });
    const newClient = Client.create({ name, email, password });
    res.status(201).json(newClient);
}


// PUT /api/clients/:id
function updateClient(req, res) {
    const id = Number(req.params.id);
    const updated = Client.update(id, req.body);
    if (!updated) return res.status(404).json({ message: 'Client non trouvé !' });
    res.json(updated);
}


// DELETE /api/clients/:id
function deleteClient(req, res) {
    const id = Number(req.params.id);
    const ok = Client.remove(id);
    if (!ok) return res.status(404).json({ message: 'Client non trouvé !' });
    res.status(204).end();
}


module.exports = { getClients, getClient, createClient, updateClient, deleteClient };