import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './components/Login'
import CreateOrJoinParty from './components/CreateOrJoinParty'
import CreateParty from './components/CreateParty'
import Footer from './components/Footer';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/CreateOrJoinParty" element={<CreateOrJoinParty/>}></Route>
      <Route path="/CreateParty" element={<CreateParty/>}></Route>
      </Routes>  
      <Footer></Footer>
    </BrowserRouter>
  )
}

export default App
