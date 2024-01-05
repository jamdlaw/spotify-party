const express = require('express');
const request = require('request');
const crypto = require('crypto');
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const mysql = require('./utils/mysqlUtils');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const getRecentlyPlayed = require('./getRecentlyPlayed');
const insertTrackData = require('./insertTrackData'); 
const getRecommendations = require('./getRecommendations');
const createPlaylist = require('./createPlaylist');
const addTracksToPlaylist = require('./addTracksToPlaylist');
const createUser = require('./createUser');
const createParty = require('./createParty');
const getUserId = require('./getUserId');

dotenv.config();
const app = express();

const client_id = process.env.client_id; // your clientId
const client_secret = process.env.client_secret; // Your secret
const redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

const generateRandomString = (length) => {
  return crypto
  .randomBytes(60)
  .toString('hex')
  .slice(0, length);
}

const stateKey = 'spotify_auth_state';

// parse application/json
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());

app.post('/createUser', async function(req,res){
  const {name, email} = req.body;
  results = await createUser(name, email);
  console.log('app.js ' + results);
  res.send(results);
});

app.post('/createParty', async function(req,res){
  
  const {userid, partyname } = req.body;
  const partyId = await createParty(userid, partyname);
  console.log('from app.js ' + partyId);
  res.send(JSON.stringify({partyId: partyId}));  
  
});

app.get('/login', function(req, res) {

  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // permission list
  const scope = 'user-read-private user-read-email user-read-recently-played playlist-modify-public playlist-modify-private';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  let code = req.query.code || null;
  let state = req.query.state || null;
  let storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    let authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

           let access_token = body.access_token,
            refresh_token = body.refresh_token;

        let options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

app.get('/refresh_token', function(req, res) {

  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')) 
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
          access_token = body.access_token,
          refresh_token = body.refresh_token;
      res.send({
        'access_token': access_token,
        'refresh_token': refresh_token
      });
    }
  });
});

app.get('/history', function(req, res){
  let access_token = req.query.access_token;
  getRecentlyPlayed(access_token)
  .then(data => {
    insertTrackData(data);   
    const arr = data.map(e => ({
      played_at: e.played_at,
      track_name: e.track.name,
      track_uri: e.track.uri.substring(e.track.uri.indexOf('track:') + 6),
    }));

    res.json(arr);
  });
  
});

app.get('/getRecommendations', async function(req, res){
  let access_token = req.query.access_token;
  data = await getRecommendations(access_token);
  data.forEach(track => {
    //console.log(track.id, track.name, track.external_urls);
    sql = "INSERT INTO recommended_tracks (track_id ,name , external_urls,uris) VALUES (?,?,?,?)";
    mysql.query(sql, [track.id, track.name, track.external_urls.spotify,track.uri]);
  });
  res.send(data);
});

app.post('/createPlaylist', function(req, res){
  let access_token = req.body.access_token;
  createPlaylist(access_token);
  
  res.send('create playlist');
});

app.post('/addTracksToPlaylist', function(req, res){
  let access_token = req.body.access_token;
  const playlistId = '2b0H9RTN1u342prSOmG8AG'; // hardcode playlist id for write now while testing
  addTracksToPlaylist(access_token,playlistId);
  
  res.send('tracks added');
})

app.get('/testUserId', async function(req, res){
   results = await getUserId('jamdlaw@yahoo.com');
  
   res.send(results);
})
console.log('Listening on 8888');
app.listen(8888);
