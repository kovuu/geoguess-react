import React from "react";

export default ({resetGame, estimating}) => (
   <div className="buttonsBlock">
       <button  onClick={estimating}>Place</button>
       <button  onClick={resetGame}>Restart Game</button>
   </div>
)
