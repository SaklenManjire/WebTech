// ─────────────────────────────────────────────
// Dashboard Component
// The home page — shows summary stats, progress bar,
// and a quick overview of topics by priority.
// Route: /  (default route)
// ─────────────────────────────────────────────

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopicService } from '../../services/topic.service';
import { Topic } from '../../models/topic.model';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  // State to hold all topics
  const [topics, setTopics] = useState<Topic[]>([]);

  // useNavigate — like Angular's Router.navigate()
  const navigate = useNavigate();

  // Load topics when component mounts (like ngOnInit in Angular)
  useEffect(() => {
    const data = TopicService.getAllTopics();
    setTopics(data);
  }, []);

  // Get counts and percentage from the service
  const statusCounts  = TopicService.getStatusCounts();
  const completionPct = TopicService.getCompletionPercentage();

  // Get the 3 most recent topics for the "Recent Activity" section
  const recentTopics = [...topics]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  // Return a colour class based on priority level
  const priorityClass = (p: string) => {
    if (p === 'High')   return 'badge badge-high';
    if (p === 'Medium') return 'badge badge-medium';
    return 'badge badge-low';
  };

  // Return a colour class based on progress status
  const statusClass = (s: string) => {
    if (s === 'Completed')  return 'status-dot dot-done';
    if (s === 'In Progress') return 'status-dot dot-progress';
    return 'status-dot dot-notstarted';
  };

  return (
    <div className="dashboard-page">

      {/* ── Page Header ── */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Track your learning journey at a glance.</p>
        </div>
        <button className="btn-primary" onClick={() => navigate('/add')}>
           Add New Topic
        </button>
      </div>

      {/* ── Summary Cards ── */}
      <div className="stats-grid">
        <div className="stat-card stat-total">
          <div>
            <p className="stat-label">Total Topics</p>
            <p className="stat-number">{topics.length}</p>
          </div>
        </div>

        <div className="stat-card stat-inprogress">
          <div>
            <p className="stat-label">In Progress</p>
            <p className="stat-number">{statusCounts['In Progress']}</p>
          </div>
        </div>

        <div className="stat-card stat-completed">
          <div>
            <p className="stat-label">Completed</p>
            <p className="stat-number">{statusCounts['Completed']}</p>
          </div>
        </div>

        <div className="stat-card stat-notstarted">
          <div>
            <p className="stat-label">Not Started</p>
            <p className="stat-number">{statusCounts['Not Started']}</p>
          </div>
        </div>
      </div>

      {/* ── Overall Progress Bar ── */}
      <div className="progress-section">
        <div className="progress-header">
          <h2 className="section-title">Overall Progress</h2>
          <span className="progress-pct">{completionPct}% Complete</span>
        </div>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${completionPct}%` }}
            title={`${completionPct}% completed`}
          />
        </div>
        <p className="progress-note">
          {statusCounts['Completed']} of {topics.length} topics completed
        </p>
      </div>

      {/* ── Recent Activity ── */}
      <div className="recent-section">
        <div className="section-header-row">
          <h2 className="section-title">Recent Topics</h2>
          <button className="btn-link" onClick={() => navigate('/topics')}>
            View All →
          </button>
        </div>

        {recentTopics.length === 0 ? (
          <p className="empty-msg">No topics added yet. Start by adding one!</p>
        ) : (
          <div className="recent-list">
            {recentTopics.map((topic) => (
              <div key={topic.id} className="recent-card">
                {/* Status indicator dot */}
                <span className={statusClass(topic.status)} title={topic.status} />

                <div className="recent-info">
                  <p className="recent-title">{topic.title}</p>
                  <p className="recent-desc">{topic.description}</p>
                </div>

                <div className="recent-meta">
                  <span className={priorityClass(topic.priority)}>{topic.priority}</span>
                  <span className="status-text">{topic.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Quick Tips ── */}
      <div className="tips-section">
        <h2 className="section-title">Study Tips</h2>
        <ul className="tips-list">
          <li>Break large topics into smaller subtasks to avoid overwhelm.</li>
          <li>Mark high-priority topics first — tackle the hard stuff early.</li>
          <li>Spend at least 30 minutes daily on "In Progress" topics.</li>
          <li>Once a topic is completed, revisit it after a week to retain knowledge.</li>
        </ul>
      </div>

    </div>
  );
};

export default Dashboard;
