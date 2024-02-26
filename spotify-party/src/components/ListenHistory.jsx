import React from 'react';
import Cookies from 'js-cookie';
import Button from './Button';

const getListenHistory = () => {
  function getListenHistory(){
    const access_token = Cookies.get('access_token');
    fetch(`http://localhost:8888/history?access_token=${encodeURIComponent(access_token)}`)
    .then(response => response.json()) // assuming the server response is JSON
    .then(data => {
      console.log(data);
    })
    .catch(error => console.error('Error:', error));
  }

  return (
    <>
    <h3>ListenHistory</h3>
    <Button onClick={getListenHistory}>Get Listen History</Button> 
    </>   
  )
}

export default getListenHistory