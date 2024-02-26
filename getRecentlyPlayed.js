const getRecentlyPlayed = async (accessToken) => {
  const url = 'https://api.spotify.com/v1/me/player/recently-played?limit=10';

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error('Error:', error);
  }
};

module.exports = getRecentlyPlayed;
