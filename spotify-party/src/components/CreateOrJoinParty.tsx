import React, { useState } from 'react'
import Button from './Button'
import CreateParty from './CreateParty';
import JoinParty from './JoinParty';

function CreateOrJoinParty(props) {

    const [showCreateParty, setshowCreateParty] = useState(false);
    const [showJoinParty, setshowJoinParty] = useState(false);
  
    const createParty = () => {
      setshowCreateParty(true);
      setshowJoinParty(false);
    }

    const joinParty = () => {
       setshowCreateParty(false);
       setshowJoinParty(true);

    }    

  return (
    <>
        <h3>Create of join a party</h3>
        <Button onClick={createParty}>Create Party</Button> | <Button onClick={joinParty}>Join Party</Button>
        {showCreateParty && <CreateParty />}
        {showJoinParty && <JoinParty />}
    </>
  )
}

CreateOrJoinParty.propTypes = {}

export default CreateOrJoinParty
