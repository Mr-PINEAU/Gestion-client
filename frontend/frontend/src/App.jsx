import { useState, useEffect } from 'react';
import { fetchClients, createClient, deleteClient } from './service/api';


// ---------------------------------------------
// Composant principal React
// ---------------------------------------------
function App() {
  // 🔹 États pour stocker les clients, le nom et l’email
  const [clients, setClients] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // ---------------------------------------------
  // Au chargement de la page, on récupère la liste
  // ---------------------------------------------
  useEffect(() => {
    loadClients();
  }, []);

  // Fonction qui appelle le backend pour obtenir les clients
  async function loadClients() {
    try {
      const data = await fetchClients();
      setClients(data); // Met à jour la liste côté frontend
    } catch (error) {
      console.error('❌ Erreur chargement clients:', error);
    }
  }

  // ---------------------------------------------
  // Ajout d’un nouveau client
  // ---------------------------------------------
  async function handleAddClient(e) {
    e.preventDefault(); // <-- empêche le rechargement automatique

    // Création du client côté backend
    try {
      const newClient = await createClient({ name, email });
      setClients([...clients, newClient]); // Met à jour la liste côté frontend
      setName('');
      setEmail('');

      // ✅ Message de succès
      setMessage(`✅ ${newClient.name} a été ajouté avec succès !`);
      setError('');

      // Efface le message après 3 secondes
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.log({ name, email });
      console.error('❌ Erreur ajout client:', error);
    }
  }

  // ---------------------------------------------
  // Suppression d’un client
  // ---------------------------------------------
  async function handleDeleteClient(id) {
    try {
      await deleteClient(id);
      // On filtre la liste pour enlever le client supprimé
      setClients(clients.filter((client) => client.id !== id));
      setMessage('🗑️ Client supprimé');
      setTimeout(() => setMessage(''), 2000);
    } catch (error) {
      console.error('❌ Erreur suppression client:', error);
    }
  }

  // ---------------------------------------------
  // Rendu du composant (affichage)
  // ---------------------------------------------
  return (

    

    <div 
      style={{ 
        padding: '2rem',
        minHeight: '100vh',
        backgroundColor: '#f5f7fa', 
        fontFamily: 'Arial',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      >

     <div
        style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          padding: '2rem 3rem',
          width: '100%',
          maxWidth: '600px',
        }}
      >

      </div>

       <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
          Gestion des Clients 🧑‍💼
        </h1>

      {/* Formulaire d’ajout */}
      <form onSubmit={handleAddClient} 
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginBottom: '2rem', 
         
        }}
        
        >

    
        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            marginRight: '1rem', 
            padding: '0.8rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '1rem',
          }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            marginRight: '1rem',
            padding: '0.8rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '1rem',
          }}
        />
        <button 
        type="submit"
            style={{
              padding: '0.8rem',
              borderRadius: '8px',
              backgroundColor: '#0078ff',
              color: 'white',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: '0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#005fd1')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#0078ff')}
        >
         ➕ Ajouter
        </button>
      </form>

       <p
        style={{
          color: message ? 'green' : 'red',
          fontWeight: 'bold',
          textAlign: 'center',
          minHeight: '1.5em',
          transition: 'opacity 0.5s ease',
        }}
      >
        {message || error}
      </p> 



      {/* Liste des clients */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {clients.map((client) => (
          <li 
          key={client.id}
          style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#f9f9f9',
                padding: '0.8rem 1rem',
                marginBottom: '0.5rem',
                borderRadius: '8px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              }}
            >
              <span>
                <strong>{client.name}</strong> — {client.email}
              </span>
            
            <button
              onClick={() => handleDeleteClient(client.id)}
              style={{
                  backgroundColor: '#ff4d4d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.4rem 0.7rem',
                  cursor: 'pointer',
                  fontWeight: 'bold', 
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#d93636')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#ff4d4d')}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------------------------------------
// Export du composant principal
// ---------------------------------------------
export default App;

