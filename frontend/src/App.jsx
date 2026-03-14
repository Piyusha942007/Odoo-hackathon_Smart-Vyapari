import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import StaffRoutes from './Staff/StaffRoutes';
import './styles/main.css'; // Your Tailwind imports

function App() {
  return (
    <BrowserRouter>
      <div className="antialiased text-slate-900">
        <StaffRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;