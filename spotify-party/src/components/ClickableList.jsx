import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

const ClickableList = ({ parties }) => {
  // Function to handle click events on list items
  const userId = Cookies.get('userId');
  const navigate = useNavigate();

  const handleClick = async (party) => {
  try{
    const response = await fetch('http://localhost:8888/joinGuestToParty', {
        method: 'POST',
        headers: {
            accept: 'application.json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"userId": userId, "partyId":party.id})
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const responseData = await response.json(); 
    console.log(responseData.results.guestId); 
    navigate("/ListenHistory");
    
  } catch(error){
    console.error('Failed to send data:', error);
  }
  };
  
  return (
    <div className="container mt-3">
      <ul className="list-group">
        {Array.isArray(parties) && parties.map((party) => (
          <li
            key={party.id}
            className="list-group-item list-group-item-action"
            onClick={() => handleClick(party)}
          >
            {party.party_name || 'No name'} {/* Display 'No name' if party_name is null */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClickableList;
