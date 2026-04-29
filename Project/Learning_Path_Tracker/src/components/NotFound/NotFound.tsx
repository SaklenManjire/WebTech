// ─────────────────────────────────────────────
// NotFound Component
// Shown when the user visits an unknown route.
// In Angular, this would be the wildcard route: { path: '**', component: ... }
// ─────────────────────────────────────────────

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-page">
      <div className="notfound-card">
        <p className="notfound-code">404</p>
        <h2 className="notfound-title">Page Not Found</h2>
        <p className="notfound-msg">
          Oops! The page you're looking for doesn't exist.
        </p>
        <button className="btn-home" onClick={() => navigate('/')}>
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default NotFound;
