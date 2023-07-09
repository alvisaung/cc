import React, { useEffect } from "react";
import SetTxt from "../img/set-txt.png";
import ScreamTxt from "../img/scream-txt.png";
import CloudOneUp from "../img/cloud-one-up.png";
import CloudOneDown from "../img/cloud-one-down.png";
import Plane from "../img/plane.png";
import CloudTwoUp from "../img/cloud-two-up.png";
import CloudTwoDown from "../img/cloud-two-down.png";
import CloudTwoBg from "../img/cloud-two-bg.png";

const Game = ({ updateTime }) => {
  useEffect(() => {
    StartGame();
  }, []);

  const StartGame = () => {};

  return (
    <div>
      <div className="game-1 ">
        <div className="hide">
          <img src={CloudOneUp} alt="" className="cloud-one-up" />
          <img src={SetTxt} alt="" className="set-txt hide" />
          <img src={ScreamTxt} alt="" className="set-txt" />
          <img src={Plane} alt="" className="plane" />
          <img src={CloudOneDown} alt="" className="cloud-one-down" />
        </div>
        <div>
          <img src={Plane} alt="" className="plane-fly-in" />
          <img src={CloudTwoUp} alt="" className="cloud-two-up" />
          <img src={CloudTwoBg} alt="" className="cloud-two-bg" />
          <img src={CloudTwoDown} alt="" className="cloud-two-down" />
        </div>
      </div>
    </div>
  );
};

export default Game;
