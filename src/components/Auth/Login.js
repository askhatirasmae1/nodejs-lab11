import React, { useState } from 'react';
import authService from '../../services/authService';

function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const login = async (e) => {
    e.preventDefault();

    try {
      await authService.login(credentials.email, credentials.password);
      setMessage('Connexion réussie');
    } catch (err) {
      setMessage('Erreur de connexion');
    }
  };

  return (
    <div>
      <h2>Connexion</h2>

      <form onSubmit={login}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Mot de passe"
          value={credentials.password}
          onChange={handleChange}
        />

        <button type="submit">Se connecter</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;