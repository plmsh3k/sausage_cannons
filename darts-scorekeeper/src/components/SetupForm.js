import react, { useState } from 'react';

function SetupForm({onSubmit}) {
    const [playerNames, setPlayerNames] = useState(["", ""]);

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(playerNames, '301', 3);
    };

    return (
        <form onSubmit={handleSubmit}>
      {/* Input fields for players */}  

            <ul> 
                {playerNames.map((name, index) => (
                    <li key={index}>{name}</li>
                ))}
            </ul> 

            <button type="submit">Start Game</button>
        </form>
    );
}

export default SetupForm;