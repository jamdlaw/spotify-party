import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import CreateOrJoinParty from './components/CreateOrJoinParty'
import CreateParty from './components/CreateParty'
import ListenHistory from './components/ListenHistory'
import Footer from './components/Footer';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<CreateOrJoinParty/>}></Route>
      <Route path="/CreateOrJoinParty" element={<CreateOrJoinParty/>}></Route>
      <Route path="/CreateParty" element={<CreateParty/>}></Route>
      <Route path="/ListenHistory" element={<ListenHistory/>}></Route>
      </Routes>  
      <Footer></Footer>
    </BrowserRouter>
  )
}

export default App
