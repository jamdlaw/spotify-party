import React, { useState } from 'react'
import Button from './Button'
import CreateParty from '../CreateParty';

function CreateOrJoinParty(props) {

    const [showCreateParty, setshowCreateParty] = useState(false);
  
    const createParty = () => {
      setshowCreateParty(true);
    }

    const joinParty = () => {
       setshowCreateParty(false);
       
    }    

  return (
    <>
        <h3>Create of join a party</h3>
        <Button onClick={createParty}>Create Party</Button> | <Button onClick={joinParty}>Join Party</Button>
        {showCreateParty && <CreateParty />}
    </>
  )
}

CreateOrJoinParty.propTypes = {}

export default CreateOrJoinParty
