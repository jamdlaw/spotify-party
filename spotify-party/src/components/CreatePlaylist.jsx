import React, { useState } from 'react';
import CreatePlaylistResults from './CreatePlaylistResults';
import { getRecommendations } from '../api';
import Cookies from 'js-cookie';

const CreatePlaylist = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRecommendations = async () => {
    setLoading(true);
    setError('');
    const access_token = Cookies.get('access_token');
    
    try {
      const result = await getRecommendations();
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
      <button onClick={fetchRecommendations} disabled={loading}>
        {loading ? 'Loading...' : 'Get Recommendations'}
      </button>
      {error && <p>Error: {error}</p>}
      <CreatePlaylistResults tracks={tracks} />
    </div>
  );
};

export default CreatePlaylist;
