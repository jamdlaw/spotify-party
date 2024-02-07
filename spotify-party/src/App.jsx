import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './components/Login'
import CreateOrJoinParty from './components/CreateOrJoinParty'
import CreateParty from './CreateParty'

function App() {
  
 
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/CreateOrJoinParty" element={<CreateOrJoinParty/>}></Route>
      <Route path="/CreateParty" element={<CreateParty/>}></Route>
      </Routes>  
    </BrowserRouter>
  )
}

export default App
