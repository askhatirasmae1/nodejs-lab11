import React, { useEffect, useState } from 'react';
import api from '../../services/axiosInstance';

function AxiosBasic() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    author: 1
  });
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts');
      setPosts(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleChange = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value
    });
  };

  const addPost = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/posts', newPost);

      setPosts([...posts, response.data]);

      setNewPost({
        title: '',
        content: '',
        author: 1
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const deletePost = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Axios Basique</h2>

      {error && <p className="error">{error}</p>}

      <h3>Ajouter un post</h3>

      <form onSubmit={addPost}>
        <input
          name="title"
          placeholder="Titre"
          value={newPost.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="content"
          placeholder="Contenu"
          value={newPost.content}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="author"
          value={newPost.author}
          onChange={handleChange}
        />

        <button type="submit">Ajouter</button>
      </form>

      <h3>Liste des posts</h3>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h4>{post.title}</h4>
            <p>{post.content}</p>
            <button onClick={() => deletePost(post.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AxiosBasic;