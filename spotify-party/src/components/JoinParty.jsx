import React, { useState, useEffect } from 'react';
import ClickableList from './ClickableList'; // Assuming ClickableList is saved in ClickableList.js

const JoinParty = () => {
  const [parties, setParties] = useState([]);

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        // Replace 'YOUR_API_ENDPOINT' with the actual URL to fetch data from
        const response = await fetch('http://localhost:8888/joinParty');
        const data = await response.json();
        //console.log(data.partyList, typeof []);
        setParties(data.partyList); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error cases or set default data if necessary
      }
    };

    fetchData(); // Call the fetch function
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <ClickableList parties={parties} />
    </div>
  );
};

export default JoinParty;