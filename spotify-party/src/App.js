import logo from './spotify_logo.png';
import './App.css';

function App() {

  function createParty(formData){
    formData.preventDefault();
    console.log('Form Data:', formData);
    // You can perform other actions with the form data here
    //const query = partyform.get("party_name");
    //alert(`Party name is: '${query}'`);
  }

  return (
    <div className="App">
        <h1>Join the party!</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <form action={createParty} name="partyform" id="partyform" method="post">
            <input type="text" name="party_name" id="party_name" />
            <input type="submit" className="btn btn-primary" value="Create a party" />
        </form>
        <h3> OR </h3>
        <a href="/joinParty" className="btn btn-primary">Join a party</a>
    </div>
  );
}

export default App;
