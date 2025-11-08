
// Ce fichier contient les fonctions qui font
// les requêtes HTTP vers ton backend Express.
// ---------------------------------------------

// Adresse de base de ton API backend
// (on utilise ici localhost:3001, le port de ton serveur Express)
const API_BASE = 'http://localhost:3001/api';

// ----------------------------------------------------
// Fonction pour récupérer la liste de tous les clients
// ----------------------------------------------------
export async function fetchClients() {
  // Envoie une requête HTTP GET vers /api/client
  const res = await fetch(`${API_BASE}/clients`);

  // Vérifie que la réponse est correcte (status 200)
  if (!res.ok) throw new Error('Erreur de chargement des clients');

  // Convertit la réponse JSON (texte brut) en objet JavaScript
  return res.json();
}

// ----------------------------------------------------
// Fonction pour créer (ajouter) un nouveau client
// ----------------------------------------------------
export async function createClient(client) {
  // Envoie une requête HTTP POST vers /api/client
  // avec le client (objet { name, email }) dans le corps de la requête
  const res = await fetch(`${API_BASE}/clients`, {
    method: 'POST', // Méthode HTTP
    headers: {
      'Content-Type': 'application/json', // Indique qu'on envoie du JSON
    },
    body: JSON.stringify(client), // Transforme l'objet JS en texte JSON
  });

  // Si la requête échoue (par ex. 400 ou 500), on lève une erreur
  if (!res.ok) throw new Error('Erreur lors de la création du client');

  // Retourne le client créé (le backend le renvoie en JSON)
  return res.json();
}

// ----------------------------------------------------
// Fonction pour supprimer un client spécifique
// ----------------------------------------------------
export async function deleteClient(id) {
  // Envoie une requête HTTP DELETE vers /api/client/:id
  const res = await fetch(`${API_BASE}/clients/${id}`, {
    method: 'DELETE',
  });

  // Si le statut n’est pas 204 (No Content), c’est une erreur
  if (!res.ok && res.status !== 204)
    throw new Error('Erreur lors de la suppression');
}
