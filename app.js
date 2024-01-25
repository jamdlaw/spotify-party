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
const getOrInsertUser = require('./getOrInsertUser');
const getProfileData = require('./getProfileData');
const getPartyList = require('./getPartyList');
const joinGuestToParty = require('./joinGuestToParty');

//TODO: add logging for errors
dotenv.config();
const app = express();

app.use(express.json({ limit: '50mb' }));

const client_id = process.env.CLIENT_ID; // Spotify clientId
const client_secret = process.env.CLIENT_SECRET; // Spotify secret
const redirect_uri = process.env.CALLBACK_URL; // Spotify redirect uri

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

app.get('/login', function(req, res) {

  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // spotify permission list
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

app.get('/callback', async function(req, res) {

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

    request.post(authOptions,  async function(error, response, body) {
      if (!error && response.statusCode === 200) {

        let access_token = body.access_token,
        refresh_token = body.refresh_token;

        const profile = await getProfileData(access_token);
        
        const UserId = await getOrInsertUser(profile.email, profile.display_name);

        const responseData = {
          access_token: access_token,
          refresh_token: refresh_token,
          userId: UserId.id
        };
        
        // Set cookies with the data
        res.cookie('access_token', access_token);
        res.cookie('refresh_token', refresh_token);
        res.cookie('userId', UserId.id);
        
        res.redirect(process.env.REACT_APP_URL);
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

app.post('/createUser', async function(req,res){
  const {email, name} = req.body;
  results = await createUser(email, name);
  res.send(JSON.stringify({id: results.insertId}));
});

app.post('/createParty', async function(req,res){
  
  const {userid, partyname } = req.body;
  const partyId = await createParty(userid, partyname);
  
  res.send(JSON.stringify({partyId: partyId}));  
  
});

app.get('/joinParty', async function(req, res){
  results = await getPartyList(); 
  res.send({ partyList: results });
});

app.post('/joinGuestToParty', function(req, res){
  //console.log(req.body);
  const {userId, partyId} = req.body;
  results = joinGuestToParty(userId, partyId);
  
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
    sql = "INSERT INTO recommended_tracks (track_id ,name , external_urls,uris) VALUES (?,?,?,?)";
    mysql.query(sql, [track.id, track.name, track.external_urls.spotify,track.uri]);
  });

  res.send(data);
});

app.post('/createPlaylist', async function(req, res){
  
  const access_token = req.body.access_token;
  const playListName = req.body.playListName;

  const playListId = await createPlaylist(access_token, playListName);
  console.log(playListId);

  res.send(JSON.stringify(playListId));
});

app.post('/addTracksToPlaylist', function(req, res){
  
  const access_token = req.body.access_token;
  const playlistId = req.body.playListId; 

  addTracksToPlaylist(access_token,playlistId);
  
  res.send('tracks added');
});

app.get('/testUserId', async function(req, res){
   results = await getOrInsertUser('test7@test.com', 'earl lawrnece'); 
   res.send({user} = results);
});

app.get('/testgetUserProfile', async function(req,res){
  const result = getProfileData(req.access_token);
  res.send(result);
});

console.log('Listening on 8888');
app.listen(8888);
