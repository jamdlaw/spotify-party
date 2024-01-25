import { useState } from 'react'
import './App.css'
import Button from './components/Button'

function App() {
  
  //<a href="http://localhost:8888/login" className="btn btn-primary">Log in to Spotify</a>

  const [alertVisable, setAlertVisablilty ] = useState(false);

  return (
    <>
      <div>
        <h1> Spotify Party Demo</h1>      
        <Button color='primary' onClick={() => setAlertVisablilty(true)}> My text </Button>
      </div> 
    </>
  )
}

export default App
