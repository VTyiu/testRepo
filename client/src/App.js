import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [rank, setRank] = useState("");
  const [match_id, setMatchID] = useState(0);
  const [username, setUsername] = useState("");
  const [user_id, setUserID] = useState(0);
  const [mapName, setMapName] = useState("");
  const [agent, setAgent] = useState("");
  const [gun, setGun] = useState("");
  const [listOfMatches, setListOfMatches] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/getMatches").then((response) => {
      setListOfMatches(response.data)
    }).catch(() => {
      console.log("ERR");
    });
  }, []);

  const createMatch = () => {
    Axios.post("http://localhost:3001/createMatch", {
      match_id: match_id,
      username: username,
      user_id: user_id,
      mapName: mapName,
      agent: agent,
      gun: gun
    }).then(() => {
      setListOfMatches([...listOfMatches, { match_id, username, user_id, mapName, agent, gun }]);
    })
  };

  const createUser = () => {
    Axios.post("http://localhost:3001/createUser", {
      name: name,
      rank: rank,
    });
  };
  return (
    <div className="App">
      <div className="userInputs">
        <input
          type="text"
          placeholder="Username..."
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Rank..."
          onChange={(event) => {
            setRank(event.target.value);
          }}
        />
        <button onClick={createUser}> Create User </button>

      </div>

      <div className="matchInputs">
        <input
          type="number"
          placeholder="Match ID..."
          onChange={(event) => {
            setMatchID(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Username..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="User ID..."
          onChange={(event) => {
            setUserID(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Map Name..."
          onChange={(event) => {
            setMapName(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Agent..."
          onChange={(event) => {
            setAgent(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Gun..."
          onChange={(event) => {
            setGun(event.target.value);
          }}
        />
        <button onClick={createMatch}> Create Match </button>
      </div>

      <div className="showMatches">
        {listOfMatches.map((val) => {
          return (
            <div className="matchContainer">
              <div className="match">
                <h3>Match ID: {val.match_id}</h3>
                <h3>Username: {val.username}</h3>
                <h3>User ID: {val.user_id}</h3>
                <h3>Map name: {val.mapName}</h3>
                <h3>Agent: {val.agent}</h3>
                <h3>Main gun used: {val.gun}</h3>
              </div>
              <div className="matchButtons">
                <button>Update</button>
                <button>Delete</button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default App;