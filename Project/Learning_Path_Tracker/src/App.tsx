// ─────────────────────────────────────────────
// App.tsx — Root Component + Router Setup
// This is the entry point of the application.
// In Angular, this would be app.module.ts + app-routing.module.ts combined.
//
// Routes defined:
//   /          → Dashboard   (summary and stats)
//   /topics    → TopicList   (all topics with filter/search)
//   /add       → TopicForm   (add new topic)
//   /edit/:id  → TopicForm   (edit existing topic — same component, edit mode)
//   *          → NotFound    (wildcard fallback)
// ─────────────────────────────────────────────

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ── Import all page components ──
import Navbar     from './components/Navbar/Navbar';
import Dashboard  from './components/Dashboard/Dashboard';
import TopicList  from './components/TopicList/TopicList';
import TopicForm  from './components/TopicForm/TopicForm';
import NotFound   from './components/NotFound/NotFound';

// ── Global app styles ──
import './App.css';

const App: React.FC = () => {
  return (
    // BrowserRouter provides routing context to the whole app
    <Router>
      {/* Navbar is outside Routes so it appears on every page */}
      <Navbar />

      {/* Main content area — Routes render the correct component */}
      <main className="app-main">
        <Routes>
          {/* Route 1: Dashboard — default home page */}
          <Route path="/"          element={<Dashboard />} />

          {/* Route 2: Topic List — view all topics */}
          <Route path="/topics"    element={<TopicList />} />

          {/* Route 3: Add Topic — new topic form */}
          <Route path="/add"       element={<TopicForm />} />

          {/* Route 4: Edit Topic — same form component in edit mode */}
          <Route path="/edit/:id"  element={<TopicForm />} />

          {/* Wildcard Route: catch all unknown URLs */}
          <Route path="*"          element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
