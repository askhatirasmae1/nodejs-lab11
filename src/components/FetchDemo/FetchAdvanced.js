import React, { useState } from 'react';

function FetchAdvanced() {
  const [postId, setPostId] = useState('');
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchPost = async () => {
    if (!postId) {
      setError('Veuillez entrer un ID');
      return;
    }

    setLoading(true);
    setError('');
    setPost(null);

    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, 5000);

    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}`, {
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error('Post non trouvé');
      }

      const postData = await response.json();

      const authorResponse = await fetch(
        `http://localhost:3001/users/${postData.author}`
      );

      const author = await authorResponse.json();

      const commentsResponse = await fetch(
        `http://localhost:3001/comments?postId=${postData.id}`
      );

      const comments = await commentsResponse.json();

      setPost({
        ...postData,
        authorDetails: author,
        comments
      });
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('La requête a dépassé 5 secondes');
      } else {
        setError(err.message);
      }
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Fetch Avancé</h2>

      <input
        type="number"
        placeholder="ID du post"
        value={postId}
        onChange={(e) => setPostId(e.target.value)}
      />

      <button onClick={fetchPost}>Récupérer le post</button>

      {loading && <p>Chargement...</p>}
      {error && <p className="error">{error}</p>}

      {post && (
        <div className="post-details">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>Auteur : {post.authorDetails.name}</p>

          <h4>Commentaires</h4>
          <ul>
            {post.comments.map((comment) => (
              <li key={comment.id}>{comment.text}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default FetchAdvanced;