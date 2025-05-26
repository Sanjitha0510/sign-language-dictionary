import React from 'react';

const AddWordModal = ({
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
      <div className="modal-content enhanced" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <h2>Add a New Word</h2>
        <form className="add-word-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Word</label>
            <input
              className="word-input"
              placeholder="Enter the word"
              value={word}
              onChange={e => onWordChange(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Definition</label>
            <input
              className="definition-input"
              placeholder="Enter the definition"
              value={definition}
              onChange={e => onDefinitionChange(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input
              className="media-input"
              placeholder="Optional image URL"
              value={imageUrl}
              onChange={e => onImageUrlChange(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Video URL</label>
            <input
              className="media-input"
              placeholder="Optional video or YouTube URL"
              value={videoUrl}
              onChange={e => onVideoUrlChange(e.target.value)}
            />
          </div>
          <button type="submit" className="modal-submit full-width">Add Word</button>
        </form>
      </div>
    </div>
  );
};

export default AddWordModal;
