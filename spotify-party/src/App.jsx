import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './components/Login'
import CreateOrJoinParty from './components/CreateOrJoinParty'

function App() {
  
 
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/CreateOrJoinParty" element={<CreateOrJoinParty/>}></Route>
      </Routes>  
    </BrowserRouter>
  )
}

export default App
