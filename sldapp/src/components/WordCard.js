import React from 'react';

function getYouTubeId(url) {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

const WordCard = ({ entry, onEdit, onDelete }) => {
  return (
    <div className="word-card">
      <h3>{entry.word.toUpperCase()}</h3>
      <p><strong>Definition:</strong> {entry.definition}</p>
      {entry.imageUrl && (
        <div className="media-box">
          <img src={entry.imageUrl} alt={entry.word} />
        </div>
      )}
      {entry.videoUrl && (
        getYouTubeId(entry.videoUrl) ? (
          <div className="media-box">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${getYouTubeId(entry.videoUrl)}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ aspectRatio: "16/9" }}
            ></iframe>
          </div>
        ) : (
          <div className="media-box">
            <video controls>
              <source src={entry.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )
      )}
      <div className="word-card-actions">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default WordCard;
