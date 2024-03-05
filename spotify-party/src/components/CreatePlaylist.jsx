import React, { useState } from 'react';
import CreatePlaylistResults from './CreatePlaylistResults';
import Cookies from 'js-cookie';
import Button from './Button';

const CreatePlaylist = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRecommendations = async () => {
    setLoading(true);
    setError('');
    const access_token = Cookies.get('access_token');

    try {
      const result = await fetch(`http://localhost:8888/createPlaylist?access_token=${encodeURIComponent(access_token)}`)
      if (result) {
        setTracks(result);
      } else {
        setError('No results found');
      }
    } catch (err) {
      setError('Failed to fetch recommendations');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <label htmlFor='playlistName'>Playlist name: </label>
          <input 
            id="playlistName"
            className="form-control"
            type="text" 
            value={playlistName}
            onChange={(e) => setName(e.target.value)}
          />
        
      <Button onClick={fetchRecommendations}>Create Playlist</Button>
      {error && <p>Error: {error}</p>}
      <CreatePlaylistResults tracks={tracks} />
    </div>
  );
};

export default CreatePlaylist;
