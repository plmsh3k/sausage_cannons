import React, { createContext, useContext, useReducer } from 'react';

const GameContext = createContext();

const initialState = {
  players: [],
  currentTurn: 0,
  currentGame: '501',
  scores: {}
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'ADD_PLAYER':
      return {
        ...state,
        players: [...state.players, action.payload],
        scores: {...state.scores, [action.payload]: []}
      };
    case 'UPDATE_SCORE':
        const { playerName, score } = action.payload;
        // Assuming you have a starting score of 501 for each player
        // Make sure to validate the score before updating to avoid negative totals
        const updatedScores = state.scores[playerName].concat(score);
        const remainingScore = 501 - updatedScores.reduce((a, b) => a + b, 0);
      
        if (remainingScore < 0) {
          // Handle bust (score went below zero)
          // Do not update the score, and it could be the end of the turn
        } else {
          // Update state with the new score
          return {
            ...state,
            scores: {
              ...state.scores,
              [playerName]: updatedScores
            },
            // Move to the next player's turn
            currentTurn: (state.currentTurn + 1) % state.players.length
          };
        }
        break;
    case 'NEXT_TURN':
        return {
        ...state,
        currentTurn: (state.currentTurn + 1) % state.players.length
        };
    case 'NEW_GAME':
      return initialState;
    default:
      return state;
  }
}



export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);

