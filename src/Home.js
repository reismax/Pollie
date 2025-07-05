import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
      <h1 className="home-title">Pollie</h1>
      <p className="home-description">Search congressional bills by ID</p>
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
