// ─────────────────────────────────────────────
// TopicForm Component
// Used for BOTH adding a new topic AND editing an existing one.
// If a topic ID exists in the URL, it's Edit mode; otherwise Add mode.
// This mimics Angular's Reactive Forms with manual validation.
// Routes: /add  and  /edit/:id
// ─────────────────────────────────────────────

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TopicService } from '../../services/topic.service';
import { ProgressStatus, PriorityLevel } from '../../models/topic.model';
import './TopicForm.css';

// ── Shape of the form fields ──
interface FormData {
  title: string;
  description: string;
  status: ProgressStatus;
  priority: PriorityLevel;
}

// ── Shape of validation errors ──
interface FormErrors {
  title?: string;
  description?: string;
}

const TopicForm: React.FC = () => {
  // Get the topic ID from the URL (present only in edit mode)
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Determine if we're in edit mode
  const isEditMode = Boolean(id);

  // ── Form state ──
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    status: 'Not Started',
    priority: 'Medium',
  });

  // ── Validation error state ──
  const [errors, setErrors] = useState<FormErrors>({});

  // ── Whether form was submitted (to show all errors at once) ──
  const [submitted, setSubmitted] = useState(false);

  // ── Success message shown after saving ──
  const [successMsg, setSuccessMsg] = useState('');

  // ── Load existing topic data when in Edit mode ──
  useEffect(() => {
    if (isEditMode && id) {
      const topic = TopicService.getTopicById(id);
      if (topic) {
        // Pre-fill the form with the existing topic's data
        setFormData({
          title:       topic.title,
          description: topic.description,
          status:      topic.status,
          priority:    topic.priority,
        });
      } else {
        // Topic not found — go back to the list
        navigate('/topics');
      }
    }
  }, [id, isEditMode, navigate]);

  // ── Handle any input/select change ──
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear the error for this field as user types (live validation)
    if (submitted) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // ── Validate form fields — returns true if valid ──
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Topic title is required.';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters.';
    } else if (formData.title.trim().length > 60) {
      newErrors.title = 'Title must be under 60 characters.';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required.';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters.';
    } else if (formData.description.trim().length > 200) {
      newErrors.description = 'Description must be under 200 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Valid if no errors
  };

  // ── Handle form submit ──
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Run validation before saving
    if (!validate()) return;

    if (isEditMode && id) {
      // UPDATE existing topic
      TopicService.updateTopic(id, formData);
      setSuccessMsg('Topic updated successfully!');
    } else {
      // CREATE new topic
      TopicService.addTopic(formData);
      setSuccessMsg('Topic added successfully!');

      // Reset form after adding
      setFormData({ title: '', description: '', status: 'Not Started', priority: 'Medium' });
      setSubmitted(false);
    }

    // Redirect to topics list after short delay
    setTimeout(() => navigate('/topics'), 1500);
  };

  // ── Handle cancel — go back ──
  const handleCancel = () => navigate(-1);

  return (
    <div className="form-page">
      <div className="form-container">

        {/* ── Form Header ── */}
        <div className="form-header">
          <h1 className="form-title">
            {isEditMode ? ' Edit Topic' : ' Add New Topic'}
          </h1>
          <p className="form-subtitle">
            {isEditMode
              ? 'Update the details of your learning topic.'
              : 'Fill in the details to add a new topic to your learning path.'}
          </p>
        </div>

        {/* ── Success Message ── */}
        {successMsg && (
          <div className="alert alert-success">{successMsg}</div>
        )}

        {/* ── The Form ── */}
        <form onSubmit={handleSubmit} noValidate className="topic-form">

          {/* Title Field */}
          <div className="form-group">
            <label className="form-label" htmlFor="title">
              Topic Title <span className="required">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className={`form-input ${submitted && errors.title ? 'input-error' : ''}`}
              placeholder="e.g., Angular Fundamentals"
              value={formData.title}
              onChange={handleChange}
              maxLength={60}
            />
            {/* Character count hint */}
            <span className="char-count">{formData.title.length}/60</span>
            {/* Validation error */}
            {submitted && errors.title && (
              <p className="error-msg">⚠ {errors.title}</p>
            )}
          </div>

          {/* Description Field */}
          <div className="form-group">
            <label className="form-label" htmlFor="description">
              Description <span className="required">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className={`form-input form-textarea ${submitted && errors.description ? 'input-error' : ''}`}
              placeholder="Briefly describe what this topic covers..."
              value={formData.description}
              onChange={handleChange}
              maxLength={200}
            />
            <span className="char-count">{formData.description.length}/200</span>
            {submitted && errors.description && (
              <p className="error-msg">⚠ {errors.description}</p>
            )}
          </div>

          {/* Status & Priority — side by side */}
          <div className="form-row">

            {/* Status Field */}
            <div className="form-group">
              <label className="form-label" htmlFor="status">Progress Status</label>
              <select
                id="status"
                name="status"
                className="form-input form-select"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Priority Field */}
            <div className="form-group">
              <label className="form-label" htmlFor="priority">Priority Level</label>
              <select
                id="priority"
                name="priority"
                className="form-input form-select"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

          </div>

          {/* Preview panel — shows current selections */}
          <div className="preview-panel">
            <p className="preview-title">Preview</p>
            <div className="preview-body">
              <p><strong>Title:</strong> {formData.title || <em className="placeholder-text">Not entered</em>}</p>
              <p>
                <strong>Status:</strong>&nbsp;
                <span className={`preview-badge status-${formData.status.replace(' ', '').toLowerCase()}`}>
                  {formData.status}
                </span>
              </p>
              <p>
                <strong>Priority:</strong>&nbsp;
                <span className={`preview-badge priority-${formData.priority.toLowerCase()}`}>
                  {formData.priority}
                </span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {isEditMode ? 'Update Topic' : 'Add Topic'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default TopicForm;
