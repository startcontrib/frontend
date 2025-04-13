// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import AnalysisPage from './pages/AnalysisPage';
import './styles/App.css'; // Import global styles

function App() {
    return (
        <Router>
            <div className="app"> 
                <Routes>
                    <Route path="/" element={<SearchPage />} />
                    <Route path="/repo/:owner/:repoName" element={<AnalysisPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;