import { useState } from 'react'
import './App.css'
import Button from './components/Button'

function App() {
  
  //<a href="http://localhost:8888/login" className="btn btn-primary">Log in to Spotify</a>

  const Login = () => {
    fetch('http://localhost:8888/testUserId')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
  }

  return (
    <>
      <div>
        <h1> Spotify Party Demo</h1>      
        <Button color='primary' onClick={() => Login()}> Log In </Button>
      </div> 
    </>
  )
}

export default App
