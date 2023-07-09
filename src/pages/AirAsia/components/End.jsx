import React from "react";
import YassTxt from "../img/yass-end-txt.png";
import GameOverTxt from "../img/game-over-txt.png";
import GoldSleet from "../img/gold-sleet.png";

const End = () => {
  return (
    <div>
      <div className="yass-gp hide">
        <img src={YassTxt} alt="" className="yass-final" />
        <div className="start-pack-txt txt-light">
          Start packing <br /> & get ready for an <br /> AirAsia Holiday Quickie
        </div>
        <img src={GoldSleet} alt="" className="gold-sleet" />
      </div>
      <div className="game-over yass-gp">
        <img src={GameOverTxt} alt="" className="center" />
        <div className="start-pack-txt better-luck-txt txt-regular">Better luck next time!</div>
      </div>
    </div>
  );
};

export default End;
