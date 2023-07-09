import React, { useEffect, useRef, useState } from "react";
import "./AirAsia.scss";
import Intro from "./components/Intro";
import Game from "./components/Game";
import End from "./components/End";

/**
 * Game Logic
 * Screen
 * 1. Intro  => SubIntro 1.1, 1.2, 1.3
 * 2. Game   => SubIntro 2.1, 2.2 (Start Listening for 10s, and cloud moving),
 * 3. Final  => Conclude 3.1 (Success), 3.2 (Game Over)
 *
 * IDLE Time => 15s
 *
 */

const AirAsia = () => {
  const [currScreen, setCurrScreen] = useState(0);
  const GameIntervalRef = useRef(null);
  const gameTimeRef = useRef(0);

  useEffect(() => {
    StartGame();
    return () => {
      EndGame();
    };
  }, []);

  const StartGame = () => {
    setCurrScreen(0);

    // Begin Idle time counting
    GameIntervalRef.current = setInterval(() => {
      if (gameTimeRef.current >= 15) {
        EndGame();
      } else {
        gameTimeRef.current += 1;
      }
    }, 1000);
  };

  const EndGame = () => {
    GameIntervalRef.current && clearInterval(GameIntervalRef.current);
    setCurrScreen(0);
  };

  const updateTime = (finish_screen) => {
    gameTimeRef.current = 0;
    // setCurrScreen(finish_screen)
  };

  return (
    <div id="AirAsia">
      {currScreen == 0 && <Intro updateTime={updateTime} />}
      {currScreen == 1 && <Game updateTime={updateTime} />}
      {currScreen == 2 && <End updateTime={updateTime} />}
    </div>
  );
};

export default AirAsia;
