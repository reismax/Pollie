import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 4ov59l-codex/create-clean-homepage-with-search-bar
import logo from './logo.svg';
 main
import './App.css';

function Home() {
  const [billId, setBillId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (billId.trim() !== '') {
      navigate(`/bill/${billId.trim()}`);
    }
  };

  return (
    <div className="home-container">
 4ov59l-codex/create-clean-homepage-with-search-bar
      <img src={logo} className="home-logo" alt="Pollie logo" />
      <h1 className="home-title">Pollie</h1>
      <p className="home-subtitle">Track Congressional bills and voting records in real time</p>
 main
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={billId}
          onChange={(e) => setBillId(e.target.value)}
          placeholder="Enter bill ID"
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
    </div>
  );
}

export default Home;
