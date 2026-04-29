// ─────────────────────────────────────────────
// TopicList Component
// Displays all learning topics in a filterable table/card layout.
// Users can filter by status or priority, edit, or delete topics.
// Route: /topics
// ─────────────────────────────────────────────

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopicService } from '../../services/topic.service';
import { Topic, ProgressStatus } from '../../models/topic.model';
import './TopicList.css';

const TopicList: React.FC = () => {
  const [topics, setTopics]           = useState<Topic[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterPriority, setFilterPriority] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const navigate = useNavigate();

  // Load topics on mount (like ngOnInit in Angular)
  useEffect(() => {
    loadTopics();
  }, []);

  // Fetch fresh data from the service
  const loadTopics = () => {
    const data = TopicService.getAllTopics();
    setTopics(data);
  };

  // Handle delete — first click shows confirm, second click deletes
  const handleDeleteClick = (id: string) => {
    if (deleteConfirmId === id) {
      // Second click: actually delete
      TopicService.deleteTopic(id);
      setDeleteConfirmId(null);
      loadTopics(); // Refresh list
    } else {
      // First click: ask for confirmation
      setDeleteConfirmId(id);
    }
  };

  // Cancel the pending delete confirmation
  const cancelDelete = () => setDeleteConfirmId(null);

  // Navigate to the edit page with the topic ID
  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  // Handle quick inline status update without opening edit form
  const handleStatusChange = (id: string, newStatus: ProgressStatus) => {
    TopicService.updateTopic(id, { status: newStatus });
    loadTopics();
  };

  // ── Filtering logic ──
  const filteredTopics = topics.filter((topic) => {
    const matchesStatus   = filterStatus   === 'All' || topic.status   === filterStatus;
    const matchesPriority = filterPriority === 'All' || topic.priority === filterPriority;
    const matchesSearch   = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            topic.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  // Returns appropriate CSS class for the status badge
  const statusBadgeClass = (s: string) => {
    if (s === 'Completed')   return 'status-badge done';
    if (s === 'In Progress') return 'status-badge progress';
    return 'status-badge notstarted';
  };

  // Returns appropriate CSS class for the priority badge
  const priorityBadgeClass = (p: string) => {
    if (p === 'High')   return 'priority-badge high';
    if (p === 'Medium') return 'priority-badge medium';
    return 'priority-badge low';
  };

  return (
    <div className="topiclist-page">

      {/* ── Page Header ── */}
      <div className="page-header">
        <div>
          <h1 className="page-title">My Topics</h1>
          <p className="page-subtitle">{topics.length} topic(s) in your learning path.</p>
        </div>
        <button className="btn-primary" onClick={() => navigate('/add')}>
          + Add Topic
        </button>
      </div>

      {/* ── Filter & Search Bar ── */}
      <div className="filter-bar">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search topics..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Filter by status */}
        <select
          className="filter-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        {/* Filter by priority */}
        <select
          className="filter-select"
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="All">All Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* ── Topic Cards ── */}
      {filteredTopics.length === 0 ? (
        <div className="empty-state">
          <p className="empty-text">No topics found. Try adjusting your filters.</p>
          <button className="btn-primary" onClick={() => navigate('/add')}>
            Add Your First Topic
          </button>
        </div>
      ) : (
        <div className="topic-grid">
          {filteredTopics.map((topic) => (
            <div key={topic.id} className="topic-card">

              {/* Card top row: title + badges */}
              <div className="card-top">
                <h3 className="card-title">{topic.title}</h3>
                <span className={priorityBadgeClass(topic.priority)}>
                  {topic.priority}
                </span>
              </div>

              {/* Description */}
              <p className="card-desc">{topic.description}</p>

              {/* Status row — dropdown to quickly change status */}
              <div className="card-status-row">
                <span className={statusBadgeClass(topic.status)}>
                  {topic.status}
                </span>

                {/* Quick status update dropdown */}
                <select
                  className="quick-status-select"
                  value={topic.status}
                  onChange={(e) => handleStatusChange(topic.id, e.target.value as ProgressStatus)}
                  title="Quick update status"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              {/* Card Actions */}
              <div className="card-actions">
                <button
                  className="btn-edit"
                  onClick={() => handleEdit(topic.id)}
                >
                </button>

                {/* Delete with inline confirm */}
                {deleteConfirmId === topic.id ? (
                  <div className="confirm-delete">
                    <span>Sure?</span>
                    <button className="btn-confirm-yes" onClick={() => handleDeleteClick(topic.id)}>
                      Yes
                    </button>
                    <button className="btn-confirm-no" onClick={cancelDelete}>
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteClick(topic.id)}
                  >
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Result count when filtered */}
      {(filterStatus !== 'All' || filterPriority !== 'All' || searchQuery) && (
        <p className="result-count">
          Showing {filteredTopics.length} of {topics.length} topics
        </p>
      )}

    </div>
  );
};

export default TopicList;
