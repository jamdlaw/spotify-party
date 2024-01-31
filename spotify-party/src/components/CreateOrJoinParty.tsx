import React from 'react'
import Button from './Button'

function CreateOrJoinParty(props) {
    const createParty = () => {
            console.log('create party ');
        }
   
    const joinParty = () => {
            console.log('join party ');
        }    

  return (
    <>
        <h3>Create of join a party</h3>
        <Button onClick={createParty}>Create Party</Button> | <Button onClick={joinParty}>Join Party</Button>
    </>
  )
}

CreateOrJoinParty.propTypes = {}

export default CreateOrJoinParty
