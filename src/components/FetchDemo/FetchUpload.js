import React, { useState } from 'react';

function FetchUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile && selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setPreview(event.target.result);
      };

      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const uploadFile = async () => {
    if (!file) {
      setStatus('Veuillez sélectionner un fichier');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setStatus('Upload en cours...');

      const response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Erreur upload');
      }

      setStatus('Fichier téléversé avec succès');
    } catch (err) {
      setStatus(err.message);
    }
  };

  return (
    <div>
      <h2>Upload avec Fetch</h2>

      <input type="file" onChange={handleFileChange} />

      {preview && (
        <div>
          <h4>Aperçu</h4>
          <img src={preview} alt="preview" width="200" />
        </div>
      )}

      <button onClick={uploadFile}>Téléverser</button>

      {status && <p>{status}</p>}
    </div>
  );
}

export default FetchUpload;