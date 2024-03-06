import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import Button from './Button';
import ListenHistoryResults from './ListenHistoryResults';




const getListenHistory = () => {

  const [listenHistory, setlistenHistory] = useState({});
  const navigate = useNavigate();

  function getListenHistory(){
    const access_token = Cookies.get('access_token');
    fetch(`http://localhost:8888/history?access_token=${encodeURIComponent(access_token)}`)
    .then(response => response.json()) 
    .then(data => {
      setlistenHistory(data);
    })
    .catch(error => console.error('Error:', error));
  }

  const createPlaylist = () =>{
    navigate("/CreatePlaylist");
  }

  return (
    <>
    <h3>ListenHistory</h3>
    <Button onClick={getListenHistory}>Get Listen History</Button> 
    {listenHistory && <Button onClick={createPlaylist}>Get Listen History</Button>}
    {listenHistory && < ListenHistoryResults listenHistory={listenHistory}/>}
    </>   
  )
}

export default getListenHistory