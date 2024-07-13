import React from "react";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to the Game!</h1>
      <p>This is the splash screen.</p>

      <button onClick={() => navigate("/play")}>Play</button>
      <button onClick={() => navigate("/game")}>Game</button>
    </div>
  );
};

export default Splash;
