// models/clientModel.js


// Simule une base de données en mémoire
let clients = [
    { id: 1, name: 'Alice', email: 'alice@example.com', password: '12345' },
    { id: 2, name: 'Bob', email: 'bob@example.com', password: '123456' }
];


let nextId = 3;


// Récupérer tous les clients
function findAll() {
    return clients;
}


// Trouver par id
function findById(id) {
    return clients.find(u => u.id === id);
}


// Créer
function create(client) {
    const newClient = { id: nextId++, ...client };
    clients.push(newClient);
    return newClient;
}


// Mettre à jour
function update(id, data) {
    const idx = clients.findIndex(u => u.id === id);
    if (idx === -1) return null;
   clients[idx] = { ...clients[idx], ...data };
    return clients[idx];
}


// Supprimer
function remove(id) {
    const idx = clients.findIndex(u => u.id === id);
    if (idx === -1) return false;
    clients.splice(idx, 1);
    return true;
}


module.exports = { findAll, findById, create, update, remove };