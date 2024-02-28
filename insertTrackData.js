const mysql = require('./utils/mysqlUtils');

// Function to insert data into the tables
const insertTrackData = async (sampleData) =>   {
  if (typeof sampleData === 'undefined' || sampleData === null || sampleData === '') {
    return;
  }

  try{
    for (const item of sampleData) {  
      // Insert artists
      const artist = item.track.artists;
      for (const a of artist){
          mysql.query('INSERT IGNORE INTO Artists (artist_id, artist_name, uri) VALUES (?, ?, ?)', [
          a.id, a.name, a.uri
        ]);
      }
      
      // Insert albums
      const album = item.track.album;
      mysql.query('INSERT IGNORE INTO Albums (album_id, album_name, album_type, total_tracks, release_date) VALUES (?, ?, ?, ?, ?)', [
        album.id,
        album.name,
        album.album_type,
        album.total_tracks,
        album.release_date
      ]);

      // Insert tracks
      mysql.query('INSERT INTO Tracks (track_id, album_id, track_name, album_name, album_type, total_tracks, release_date, track_number, duration_ms, explicit, popularity, preview_url, is_local, played_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        item.track.id,
        album.id,
        item.track.name,
        album.name,
        album.album_type,
        album.total_tracks,
        album.release_date,
        item.track.track_number,
        item.track.duration_ms,
        item.track.explicit,
        item.track.popularity,
        item.track.preview_url,
        item.track.is_local,
        item.played_at
      ]);

    } //end of sampleData loop
    console.log('Data inserted successfully.');
  } catch(error){
    console.log(error);
  }

};

module.exports = insertTrackData;
 