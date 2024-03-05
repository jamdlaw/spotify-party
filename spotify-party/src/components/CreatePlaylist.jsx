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
      const result = await fetch(`http://localhost:8888/createPlaylist?`, {
        method:POST,
        body:{access_token:access_token}
      });
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
    <>
    <div> 
      <Button onClick={fetchRecommendations}>Create Playlist</Button>
      {error && <p>Error: {error}</p>}
      <CreatePlaylistResults tracks={tracks} />
    </div>
    </>
  );
};

export default CreatePlaylist;
