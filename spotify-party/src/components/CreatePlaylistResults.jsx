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
          <div>
          <li key={index}>{track.name} by {track.artists.map(artist => artist.name).join(', ')}</li>
          <audio controls>
            <source src={track.preview_url} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default CreatePlaylistResults;
