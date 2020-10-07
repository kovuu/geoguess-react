import React from "react";

export default ({nextCity, distance, lifes, counter, resetGame, gameOver, victory, estimating}) => {
    return (
        <div style={{position: 'absolute' , margin: '0 auto'}}>
            {victory && <p>VICTORY!!!</p>}
            {(!gameOver || !victory) && <p>Next City: {nextCity}</p>}
            {distance && <p>Your guess was {distance}km from the correct location</p>}
            {lifes > 0 ? <p>You have {lifes} km</p> : <p>You lost. Your best score is {counter} cities</p> }
        </div>
    )
}
