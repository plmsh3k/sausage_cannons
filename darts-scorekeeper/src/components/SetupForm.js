// src/components/SetupForm.js

import React, { useState } from 'react';

function SetupForm({ startGame }) {
  const [gameType, setGameType] = useState('301');
  const [players, setPlayers] = useState(['']); // Start with one empty player

  const addPlayerInput = () => {
    setPlayers([...players, '']);
  };

  const handlePlayerNameChange = (index, newName) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = newName;
    setPlayers(updatedPlayers);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    startGame(gameType, players.filter(name => name.trim() !== ''));
  };

  return (
    <div className="setup-container"> {/* Centering container */}
      <div className="setup-box"> {/* Box container for content */}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="gameType">Select game type: </label>
            <select
              style={{
                background: "#4c7450",
                color: "white",
                border: "none",
                padding: 2,
              }}
              id="gameType"
              value={gameType}
              onChange={(e) => setGameType(e.target.value)}
            >
              <option value="301">301</option>
              <option value="501">501</option>
            </select>
          </div>

          <div className="player-inputs">
            {players.map((name, index) => (
              <input
                key={index}
                type="text"
                value={name}
                onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                placeholder={`Player ${index + 1} name`}
              />
            ))}
          </div>

          <div className="form-buttons"> {}
            <button type="button" onClick={addPlayerInput}>Add Player</button>
            <button type="submit">Start Game</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SetupForm;
