import { useGame } from '../context/GameContext';

export default function ScoreInput() {
  const [score, setScore] = useState('');
  const { state, dispatch } = useGame();
  const currentPlayer = state.players[state.currentTurn];

  const submitScore = (e) => {
    e.preventDefault();
    dispatch({
      type: 'UPDATE_SCORE',
      payload: { player: currentPlayer, score: parseInt(score, 10) }
    });
    dispatch({ type: 'NEXT_TURN' });
    setScore('');
  };

  return (
    <form onSubmit={submitScore}>
      <input
        type="number"
        value={score}
        onChange={(e) => setScore(e.target.value)}
        placeholder="Enter player score"
      />
      <button type="submit">Submit Score</button>
    </form>
  );
}