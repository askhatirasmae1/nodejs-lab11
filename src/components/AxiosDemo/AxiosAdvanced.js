import React, { useState } from 'react';
import axios from 'axios';
import api from '../../services/axiosInstance';

function AxiosAdvanced() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');

  const searchPosts = async () => {
    if (!searchTerm) {
      setMessage('Veuillez entrer un mot');
      return;
    }

    try {
      const response = await api.get(`/posts?q=${searchTerm}`);
      setResults(response.data);
      setMessage('');
    } catch (err) {
      setMessage(err.message);
    }
  };

  const uploadFile = async () => {
    if (!file) {
      setMessage('Veuillez sélectionner un fichier');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('https://httpbin.org/post', formData, {
        onUploadProgress: (event) => {
          const percentage = Math.round((event.loaded * 100) / event.total);
          setProgress(percentage);
        }
      });

      setMessage('Upload réussi');
    } catch (err) {
      setMessage(err.message);
    }
  };

  const fetchAll = async () => {
    try {
      const [users, posts, comments] = await Promise.all([
        api.get('/users'),
        api.get('/posts'),
        api.get('/comments')
      ]);

      console.log('Users:', users.data);
      console.log('Posts:', posts.data);
      console.log('Comments:', comments.data);

      setMessage('Données récupérées. Voir console.');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div>
      <h2>Axios Avancé</h2>

      <h3>Recherche</h3>

      <input
        placeholder="Rechercher post..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button onClick={searchPosts}>Rechercher</button>

      <ul>
        {results.map((post) => (
          <li key={post.id}>
            {post.title}
            <p>{post.content}</p>
          </li>
        ))}
      </ul>

      <h3>Upload avec progression</h3>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button onClick={uploadFile}>Upload</button>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      <p>{progress}%</p>

      <h3>Requêtes parallèles</h3>

      <button onClick={fetchAll}>Récupérer users/posts/comments</button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default AxiosAdvanced;