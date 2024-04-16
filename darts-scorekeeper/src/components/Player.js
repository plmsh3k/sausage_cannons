import React from "react";

function Player({ name }) {
    return (
        <div className="player">
            <h3>{name}</h3>
            <p className="score"> {/* Starting score*/}</p>
        </div>
    );
}

export default Player;