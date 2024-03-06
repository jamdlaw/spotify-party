import React, { useState, useEffect } from 'react';
import CreatePlaylistResults from './CreatePlaylistResults';
import Cookies from 'js-cookie';

const CreatePlaylist = () => {
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState('');
  const [playlistName, setPlaylistName] = useState('');

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setData(data); // Set the fetched data in state
      } catch (error) {
        setError(error.message); // Set error in state if fetching fails
        console.error("Failed to fetch data:", error);
      }
    };
  }); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const access_token = Cookies.get('access_token');
    const spotifyUserID = Cookies.get('spotifyUserID');

    try {
      const result = await fetch(`http://localhost:8888/createPlaylist?`, {
        method:'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({"access_token":access_token,
                             "playlistName":playlistName,
                             "spotifyUserID":spotifyUserID
                    })
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
