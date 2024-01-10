const request = require('request');

const getProfileData = async (access_token) => {
  return new Promise((resolve, reject) => {
    let options = {
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };

    // use the access token to access the Spotify Web API
    let userId = ''; 
    request.get(options, async function(error, response, body) {
        //console.log(body.email , body.display_name);
        resolve(body);      
    });
  });
}

module.exports = getProfileData;