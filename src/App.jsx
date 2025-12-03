import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BallotUnit from './components/BallotUnit';
import SuccessPage from './components/SuccessPage';
import CandidateCard from './components/CandidateCard';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BallotUnit />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/result" element={<CandidateCard />} />
      </Routes>
    </Router>
  );
}

export default App;