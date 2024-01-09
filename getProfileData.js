/* jlawrence: we can remove this code when we 
figure out how email and display_name are being recived already.
*/
let options = {
url: 'https://api.spotify.com/v1/me',
headers: { 'Authorization': 'Bearer ' + access_token },
json: true
};

// use the access token to access the Spotify Web API
let userId = ''; 
request.get(options, async function(error, response, body) {
console.log(body.email , body.display_name);
userId = await getOrInsertUser(body.email, body.display_name);  
console.log(userId);     
});
