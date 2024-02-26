import React from 'react'
import Cookies from 'js-cookie';

const getListenHistory = () => {
  function getListenHistory(){
    const access_token = Cookies.get('access_token');
    fetch(`/history?access_token=${encodeURIComponent(access_token)}`)
    .then(response => response.json()) // assuming the server response is JSON
    .then(data => {
      console.log(data);
    })
    .catch(error => console.error('Error:', error));
  }

  return (
    <>
    <div>getListenHistory</div>
    <Button onClick={getListenHistory}>Create Party</Button> 
    </>   
  )
}

export default getListenHistory