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
          <div key={track.id}> {/* Assuming `track.id` is a unique identifier */}
          <li key={index}>{track.name} by {track.artists.map(artist => artist.name).join(', ')}</li>
          <img 
              src={track.album.images[0].url} 
              alt="Album Art" 
              style={{ width: '100px', height: '100px' }} // Example styling
            />
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
