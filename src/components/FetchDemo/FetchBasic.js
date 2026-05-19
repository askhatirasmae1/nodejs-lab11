import React, { useEffect, useState } from 'react';

function FetchBasic() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'user'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3001/users');

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });
  };

  const addUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const addedUser = await response.json();
      setUsers([...users, addedUser]);

      setNewUser({
        name: '',
        email: '',
        role: 'user'
      });
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Fetch Basique</h2>

      {error && <p className="error">{error}</p>}

      <h3>Liste des utilisateurs</h3>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email} - {user.role}
          </li>
        ))}
      </ul>

      <h3>Ajouter un utilisateur</h3>

      <form onSubmit={addUser}>
        <input
          type="text"
          name="name"
          placeholder="Nom"
          value={newUser.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleChange}
          required
        />

        <select name="role" value={newUser.role} onChange={handleChange}>
          <option value="user">Utilisateur</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default FetchBasic;