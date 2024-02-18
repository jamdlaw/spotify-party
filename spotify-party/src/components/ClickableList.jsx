import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported


const ClickableList = ({ parties }) => {
  // Function to handle click events on list items
  const handleClick = (party) => {
    //alert(`Clicked on party id: ${party.id || 'No name'}`);
    fetch('http://localhost:8888/joinGuestToParty', {
        method: 'POST',
        headers: {
            accept: 'application.json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"userId":20, "partyId":party.id})
    });
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
