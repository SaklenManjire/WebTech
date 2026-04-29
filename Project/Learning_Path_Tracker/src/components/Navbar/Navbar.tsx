// ─────────────────────────────────────────────
// Navbar Component
// Displays the top navigation bar with links to all routes.
// In Angular, this would be a standalone NavbarComponent with RouterLink.
// ─────────────────────────────────────────────

import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      {/* App brand / title */}
      <div className="navbar-brand">
        <span className="brand-name">Learning Path Tracker</span>
      </div>

      {/* Navigation links — NavLink adds "active" class automatically */}
      <ul className="navbar-links">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            end
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/topics"
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            My Topics
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/add"
            className={({ isActive }) => isActive ? 'nav-link active add-btn' : 'nav-link add-btn'}
          >
            Add Topic
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
