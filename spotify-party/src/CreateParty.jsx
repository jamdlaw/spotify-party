import React from 'react'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateParty = () => {
  
    const [partyName, setName] = useState("");
  
    const handleSubmit = (event) => {
      event.preventDefault();
      
      let party_name = partyName; 

        fetch('http://localhost:8888/createParty', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({"partyname":party_name, "userid": localStorage.getItem('userId')}) //hardcode userid for now
        })
        .then(response => {
          // Handle the response as needed
          console.log('Party created!', response);
        })
        .catch(error => {
          // Handle errors
          console.error('Error creating party:', error);
        });
        
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <label for='partyName'>Enter party name: </label>
          <input 
            id="partyName"
            className="form-control"
            type="text" 
            value={partyName}
            onChange={(e) => setName(e.target.value)}
          />
        
        <input type="submit" className="btn btn-primary" />
      </form>
    )
  }


export default CreateParty