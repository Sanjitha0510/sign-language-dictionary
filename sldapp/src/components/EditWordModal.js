import React from 'react';

const EditWordModal = ({
  word,
  definition,
  imageUrl,
  videoUrl,
  onWordChange,
  onDefinitionChange,
  onImageUrlChange,
  onVideoUrlChange,
  onSubmit,
  onClose
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content edit-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <div className="edit-icon">
          <svg width="32" height="32" fill="none" stroke="#2563eb" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </div>
        <h2>Edit Word</h2>
        <form className="edit-word-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Word</label>
            <input
              className="edit-input"
              placeholder="Enter the word"
              value={word}
              onChange={e => onWordChange(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Definition</label>
            <input
              className="edit-input"
              placeholder="Enter the definition"
              value={definition}
              onChange={e => onDefinitionChange(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input
              className="edit-input"
              placeholder="Optional image URL"
              value={imageUrl}
              onChange={e => onImageUrlChange(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Video URL</label>
            <input
              className="edit-input"
              placeholder="Optional video or YouTube URL"
              value={videoUrl}
              onChange={e => onVideoUrlChange(e.target.value)}
            />
          </div>
          <div className="edit-modal-actions">
            <button type="button" className="edit-cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="edit-save-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditWordModal;
