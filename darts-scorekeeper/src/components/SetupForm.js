import React, { useState } from 'react';
import Legs from './Legs';

function SetupForm({ startGame }) {
  const [gameType, setGameType] = useState('301');
  const [players, setPlayers] = useState(['']); // Start with one empty player
  const [legs, setLegs] = useState(1);

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
    startGame(gameType, players.filter(name => name.trim() !== ''), legs);
  };

  const handleGameTypeChange = (type) => {
    setGameType(type);
  };

  const handleLegsChange = (value) => {
    setLegs(parseInt(value));
  };

  return (
    <div className="setup-container">
      <div className="setup-box">
        <form onSubmit={handleSubmit}>
          <div>
            <p>Select game type:</p>
            <div className="game-type-buttons">
              <button
                className={gameType === '301' ? 'selected' : ''}
                onClick={() => handleGameTypeChange('301')}
              >
                301
              </button>
              <button
                className={gameType === '501' ? 'selected' : ''}
                onClick={() => handleGameTypeChange('501')}
              >
                501
              </button>
            </div>
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

          <div className="form-buttons">
            <button type="button" onClick={addPlayerInput}>Add Player</button>
            <button type="submit">Start Game</button>
          </div>
          <Legs currentLeg={1} totalLegs={legs} />
          <div>
            <label htmlFor="legsInput">Number of Legs:</label>
            <input
              id="legsInput"
              type="number"
              value={legs}
              onChange={(e) => handleLegsChange(e.target.value)}
              min="1"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default SetupForm;
