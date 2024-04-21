import React from "react";
import Player from "./Player";

function ScoreBoard({ players, gameType}) {
    return (
        <div className="scoreboard">
            {/*Display the game type*/}
            <h2>{gameType}</h2>

            <div className="player-list">
                {players.map((name, index) => (
                    <Player key={index} name={name} />
                ))}
            </div>
        </div>
    );
}

export default ScoreBoard;