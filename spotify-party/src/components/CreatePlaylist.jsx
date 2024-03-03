import React, { useState } from 'react';
import CreatePlaylistResults from './CreatePlaylistResults';
import Cookies from 'js-cookie';
import { getRecommendations } from '../api';

const CreatePlaylist = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const accessToken = Cookies.get('access_token'); // Obtain this from your authentication flow

  const fetchRecommendations = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await getRecommendations(accessToken);
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
