import React from "react";

export default ({resetGame, estimating}) => (
   <div>
    <button style={{position: "absolute", top: '92%', right: '22%'}} onClick={resetGame}>Reset Game</button>
    <button style={{position: "absolute", top: '92%', right: '10%'}} onClick={estimating}>Place</button>
   </div>
       )
