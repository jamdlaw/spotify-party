import React, { useEffect, useState } from 'react'
import Button from './Button'
import CreateParty from './CreateParty';
import JoinParty from './JoinParty';
import { useNavigate } from 'react-router-dom';
import { useLogin } from './LoginContext'; // Import the context hook


function CreateOrJoinParty() {

    const [showCreateParty, setshowCreateParty] = useState(false);
    const [showJoinParty, setshowJoinParty] = useState(false);

    const useAuthRedirect = () => {
      const navigate = useNavigate();
      const { isLoggedIn, checkLogin } = useLogin();
    
      useEffect(() => {
        checkLogin();
        if (!isLoggedIn) {
          // Redirect to backend login if not logged in
          window.location.href = 'http://localhost:8888';
        }
      }, [isLoggedIn, navigate, checkLogin]);
    };
  
    const createParty = () => {
      setshowCreateParty(true);
      setshowJoinParty(false);
    }

    const joinParty = () => {
       setshowCreateParty(false);
       setshowJoinParty(true);

    }
    
    useAuthRedirect();

  return (
    <>
        <h3>Create or Join a Party</h3>
        <Button onClick={createParty}>Create Party</Button> | <Button onClick={joinParty}>Join Party</Button>
        {showCreateParty && <CreateParty />}
        {showJoinParty && <JoinParty />}
    </>
  )
}

CreateOrJoinParty.propTypes = {}

export default CreateOrJoinParty
