import logo from './spotify_logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
        <h1>Join the party!</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <form action="" name="partyform" id="partyform" method="post">
            <input type="text" name="party_name" id="party_name" />
            <input type="submit" class="btn btn-primary" value="Create a party" />
          </form>
        <a href="/joinParty" class="btn btn-primary">Join a party</a>
    </div>
  );
}

export default App;
