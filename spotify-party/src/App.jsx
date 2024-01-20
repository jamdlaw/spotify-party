import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1> Spotify Party Demo</h1>
        <a href="localhost:8888/login" className="btn btn-primary">Log in to Spotify</a>
      </div> 
    </>
  )
}

export default App
