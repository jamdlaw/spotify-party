import Cookies from 'js-cookie';

// Utility function to construct headers
const constructHeaders = (accessToken) => ({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get('access_token')}`,
  });
  
  // Function to get seed tracks - assuming you have this implemented
  // This is just a placeholder. You should replace it with your actual implementation
  const getSeedTracks = async () => {
    // Your logic to get seed tracks goes here
    return 'seed_tracks_query_string';
  };
  
  // Main function to get recommendations
  export const getRecommendations = async (accessToken) => {
    try {
      const queryString = await getSeedTracks();
      const url = `https://api.spotify.com/v1/recommendations?${queryString}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: constructHeaders(accessToken),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data.tracks;
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  };
  