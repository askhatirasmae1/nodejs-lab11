import React, { useState } from 'react';
import './App.css';

import FetchBasic from './components/FetchDemo/FetchBasic';
import FetchAdvanced from './components/FetchDemo/FetchAdvanced';
import FetchUpload from './components/FetchDemo/FetchUpload';

import AxiosBasic from './components/AxiosDemo/AxiosBasic';
import AxiosAdvanced from './components/AxiosDemo/AxiosAdvanced';

function App() {
  const [activeTab, setActiveTab] = useState('fetch-basic');

  const renderContent = () => {
    if (activeTab === 'fetch-basic') return <FetchBasic />;
    if (activeTab === 'fetch-advanced') return <FetchAdvanced />;
    if (activeTab === 'fetch-upload') return <FetchUpload />;
    if (activeTab === 'axios-basic') return <AxiosBasic />;
    if (activeTab === 'axios-advanced') return <AxiosAdvanced />;

    return <FetchBasic />;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Communication HTTP Frontend-Backend</h1>
        <p>Démonstration de Fetch et Axios</p>
      </header>

      <nav className="App-nav">
        <button onClick={() => setActiveTab('fetch-basic')}>Fetch Basique</button>
        <button onClick={() => setActiveTab('fetch-advanced')}>Fetch Avancé</button>
        <button onClick={() => setActiveTab('fetch-upload')}>Upload Fetch</button>
        <button onClick={() => setActiveTab('axios-basic')}>Axios Basique</button>
        <button onClick={() => setActiveTab('axios-advanced')}>Axios Avancé</button>
      </nav>

      <main className="App-content">{renderContent()}</main>

      <footer className="App-footer">
        <p>TP: Communication HTTP avec Fetch et Axios</p>
      </footer>
    </div>
  );
}

export default App;
