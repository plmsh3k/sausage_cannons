import React, {useState} from 'react';
import './App.css';
import SetupForm from './components/SetupForm';
import ScoreBoard from './components/ScoreBoard';


function App() {
  const [players, setPlayers] = useState([]);
  const [gameType, setGameType] = useState('301'); 
  const [setSize, setSetSize] = useState(3); 
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="app-container">
      { !gameStarted ? (
        <SetupForm
        onSubmit={(players, gameType, setSize) => {
          setPlayers(players);
          setGameType(gameType);
          setSetSize(setSize);
          setGameStarted(true);
        }}
        />
      ) : (
        <ScoreBoard
          players={players}
          gameType={gameType}
          gameStarted={gameStarted} />
      )}
      </div>
  );
}

export default App;