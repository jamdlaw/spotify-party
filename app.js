/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/documentation/web-api/tutorials/code-flow
 */

var express = require('express');
var request = require('request');
var crypto = require('crypto');
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
const getRecentlyPlayed = require('./getRecentlyPlayed');
const mysql = require('./utils/mysqlUtils');
const insertTrackData = require('./insertTrackData'); 
const getRecommendations = require('./getRecommendations');
const createPlaylist = require('./createPlaylist');
const addTracksToPlaylist = require('./addTracksToPlaylist');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();

var client_id = process.env.client_id; // your clientId
var client_secret = process.env.client_secret; // Your secret
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri



const generateRandomString = (length) => {
  return crypto
  .randomBytes(60)
  .toString('hex')
  .slice(0, length);
}

var stateKey = 'spotify_auth_state';

var app = express();

// parse application/json
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());

app.post('/createUser', function(req,res){
  const {name, email} = req.body;
  const sql = "INSERT INTO users (name , email) VALUES(?, ?)";
  try{  
    mysql.query(sql, [name , email]);
  } catch(error){
    console.log(error);
  }
  
  res.send('All Done');
});

app.post('/createParty', function(req,res){
  
  const { userId, partyName } = req.body;
  const sqlQuery = 'INSERT INTO party ( party_name, user_id ) VALUES(?,?)';
  let results = '';
  try{
    mysql.query(sqlQuery,[partyName , userId] );
  } catch(error){
    console.log(error);
  }

   res.send('done');    
  
});

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email user-read-recently-played playlist-modify-public playlist-modify-private';
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

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
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

           var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
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

console.log('Listening on 8888');
app.listen(8888);
