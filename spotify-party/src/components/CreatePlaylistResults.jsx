import React from 'react';

const CreatePlaylistResults = ({ tracks }) => {
  if (!tracks.length) {
    return <div>No recommendations to display.</div>;
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <ul>
        {tracks.map((track, index) => (
          <li key={index}>{track.name} by {track.artists.map(artist => artist.name).join(', ')}</li>
        ))}
      </ul>
    </div>
  );
};

export default CreatePlaylistResults;
