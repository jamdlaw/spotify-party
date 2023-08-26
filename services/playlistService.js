const mysqlUtils = require('../utils/mysqlUtils');

module.exports = {
  async createPlaylistRecord(userId, playlistName) {
    const sql = 'INSERT INTO playlists (user_id, name) VALUES (?, ?)';
    const values = [userId, playlistName];

    try {
      const result = await mysqlUtils.query(sql, values);
      return result.insertId; // Return the inserted playlist ID
    } catch (error) {
      throw error;
    }
  },
  // Other playlist-related service functions
};
