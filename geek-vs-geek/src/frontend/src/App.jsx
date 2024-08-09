import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import JoinPage from './pages/JoinPage';
import MatchPage from './pages/MatchPage';
import Footer from './components/Footer';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/create" element={<CreatePage />} />
                <Route path="/join" element={<JoinPage />} />
                <Route path="/match/:sessionId/:username" element={<MatchPage />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
