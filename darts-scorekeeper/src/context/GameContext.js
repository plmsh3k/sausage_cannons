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
      const { player, score } = action.payload;
      const newScores = {...state.scores};
      newScores[player].push(score);
      return {
        ...state,
        scores: newScores
      };
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

