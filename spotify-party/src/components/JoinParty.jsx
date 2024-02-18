import React from 'react'

const JoinParty = async () => {
  const partyList = await fetch('http://localhost:8888/joinParty');

   // Function to handle click events on list items
   const handleClick = (party) => {
    alert(`Clicked on party: ${party.party_name || 'No name'}`);
  };


  return (
    <>
      <h3>JoinParty</h3>
      <div className="container mt-3">
      <ul className="list-group">
        {partyList.map((party) => (
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
    </>
  )
}

export default JoinParty