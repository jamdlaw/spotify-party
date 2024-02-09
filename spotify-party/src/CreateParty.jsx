import React from 'react'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateParty = () => {
  
    const [name, setName] = useState("");
  
    const handleSubmit = (event) => {
      event.preventDefault();
      alert(`The name you entered was: ${name}`)
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <label for='partyName'>Enter party name: </label>
          <input 
            id="partyName"
            className="form-control"
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        
        <input type="submit" className="btn btn-primary" />
      </form>
    )
  }


export default CreateParty