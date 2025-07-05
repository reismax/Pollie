import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import BillPage from './BillPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bill/:id" element={<BillPage />} />
      </Routes>
    </Router>
  );
}

export default App;
