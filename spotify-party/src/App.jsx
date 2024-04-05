import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import CreateOrJoinParty from './components/CreateOrJoinParty'
import CreateParty from './components/CreateParty'
import ListenHistory from './components/ListenHistory'
import { LoginProvider } from './components/LoginContext'
import CreatePlaylist from './components/CreatePlaylist'
import Navbar from './Navbar.jsx';
import Footer from './components/Footer';

function App() {
  
  return (
    <LoginProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<CreateOrJoinParty/>}></Route>
        <Route path="/CreateOrJoinParty" element={<CreateOrJoinParty/>}></Route>
        <Route path="/CreateParty" element={<CreateParty/>}></Route>
        <Route path="/ListenHistory" element={<ListenHistory/>}></Route>
        <Route path="/CreatePlaylist" element={<CreatePlaylist/>}></Route>
        </Routes>  
        <Footer></Footer>
      </BrowserRouter>
    </LoginProvider>
  )
}

export default App
