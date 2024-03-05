import React, { useState } from 'react';
import CreatePlaylistResults from './CreatePlaylistResults';
import Cookies from 'js-cookie';

const CreatePlaylist = () => {
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState('');
  const [playlistName, setPlaylistName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const access_token = Cookies.get('access_token');

    try {
      const result = await fetch(`http://localhost:8888/createPlaylist?`, {
        method:'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({"access_token":access_token , "playlistName":playlistName})
      });
      if (result) {
        setTracks(result);
      } else {
        setError('No results found');
      }
    } catch (err) {
      setError('Failed to fetch recommendations');
      console.error(err);
    } 
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
        <label htmlFor='playlistName'>Enter party name: </label>
          <input 
            id="playlistName"
            className="form-control"
            type="text" 
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
          />
        
        <input type="submit" className="btn btn-primary" />
      </form>
      <CreatePlaylistResults tracks={tracks} />
    </>
  );
};

export default CreatePlaylist;
