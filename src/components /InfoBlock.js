import React from "react";

export default ({nextCity, lifes, gameOver, victory, citiesCount, distance}) => {
    return (
        <div className="info-block">
            <div className="info-block-msg">
                <span>{citiesCount} cities placed</span>
            </div>
            <div className="info-block-msg">
                <span>{lifes >0 ? lifes.toFixed(0) : 0} kilometers left</span>
            </div>
            {(!victory && !gameOver) && <div className="opacity-block-msg">
                <span>Select the location of {nextCity}</span>
            </div>}
            {distance && <div className="opacity-block-msg">
                <span>Your guess was {distance}km from the correct location</span>
            </div>}
            {victory && <div className="opacity-block-msg">
                <span>Victory!!!</span>
            </div>}
            {gameOver && <div className="opacity-block-msg">
                <span>You lost</span>
            </div>}
        </div>
    )
}
