import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/store';
import Profile from './pages/profile';
import Adjustments from './pages/Adjustments';
import Transfers from './pages/Transfers';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/profile" replace />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Adjustments" element={<Adjustments />} />
          <Route path="/Transfers" element={<Transfers />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;