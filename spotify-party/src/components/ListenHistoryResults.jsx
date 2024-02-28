import React from 'react';

const ListenHistoryResults = ({ listenHistory }) => {
  const historyItems = Object.values(listenHistory);  
  return (
    <div>
      <ul>
        {historyItems[0].map((item, index) => (
          <li key={index}>
            <div>Played at: {new Date(item.played_at).toLocaleString()}</div>
            <div>Track Name: {item.track_name}</div>
            <div>Track URI: <a href={`https://open.spotify.com/track/${item.track_uri}`}>{item.track_uri}</a></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListenHistoryResults;
