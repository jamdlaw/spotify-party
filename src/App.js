import React, { useEffect, useState } from "react";
import './App.css';
import axios from 'axios';

function App() {
    const SCOPE = "user-read-recently-played";
    const CLIENT_ID = "a8bf7b856450451aa2b7508d88c03830"
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const [token, setToken] = useState("")
    const [listenHistory, setListenHistory] = useState([])
    const [artistSeedIds, setArtistSeedIds] = useState([]);
    
    
    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }

        setToken(token)

        const fetchArtistIdsFromListenHistory = () => {
            // Extract artist IDs from listenHistory and add them to the artistSeedIds array
            const ids = listenHistory.map(track => track.track.artists.map(artist => artist.id)).flat();
            setArtistSeedIds(ids);
        };

        // ... (previous code)

        if (listenHistory.length > 0) {
            fetchArtistIdsFromListenHistory();
        }
    }, [listenHistory])

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }

    const getListenHistory = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.get("https://api.spotify.com/v1/me/player/recently-played", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            setListenHistory(data.items);
        } catch (error) {
            console.error("Error fetching listen history:", error);
        }
    }
    
    const chunkArray = (arr, chunkSize) => {
        const chunks = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            chunks.push(arr.slice(i, i + chunkSize));
        }
        return chunks;
    }

    const getRecommendations = async () => {
        try {
            const chunkedArtistSeedIds = chunkArray(artistSeedIds, 5); // Adjust chunkSize as needed
            let recommendations = [];

            await axios.all(
                chunkedArtistSeedIds.map(ids => (
                    axios.get("https://api.spotify.com/v1/recommendations", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        params: {
                            seed_artists: ids.join(",") // Join the artist IDs with commas
                        },
                    })
                ))
            ).then(responses => {
                // Merge recommendations from all responses
                recommendations = responses.flatMap(response => response.data.tracks);
            });

            // Do something with the merged recommendations (e.g., set a new state variable)
            console.log("Recommendations:", recommendations);
        } catch (error) {
            console.error("Error fetching recommendations:", error);
        }
    }

    return (
        <div className="App">
            {token ? (
                <div>
                    <button onClick={getListenHistory}>Get Listen History</button>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Login with Spotify</a>
            )}
            {listenHistory.length > 0 && (
                <div>
                    <h2>Listening History:</h2>
                    <ul >
                        {listenHistory.map((track) => (
                            <li key={track.played_at}>{track.track.name} - {track.track.artists.map(artist => artist.name + " - " + artist.id).join(", ")}</li>
                        ))}
                    </ul>
                    <button onClick={getRecommendations}>Get Recommendations</button>
                </div>
            )}
        </div>
    );
}

export default App;
