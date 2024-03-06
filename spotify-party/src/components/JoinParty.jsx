import React, { useState, useEffect } from 'react';
import ClickableList from './ClickableList'; // Assuming ClickableList is saved in ClickableList.js

const JoinParty = () => {
  const [parties, setParties] = useState([]);

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8888/joinParty');
        const data = await response.json();
        
        setParties(data.partyList); 
      } catch (error) {
        console.error('Error fetching data:', error);
        
      }
    };

    fetchData(); 
  }, []); 

  return (
    <div>
      <ClickableList parties={parties} />
    </div>
  );
};

export default JoinParty;
