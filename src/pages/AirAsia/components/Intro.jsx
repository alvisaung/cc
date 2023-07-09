import React, { useEffect } from "react";
import yass from "../img/yass-txt.png";
import TenSec from "../img/ten-s-txt.png";
import ReadyTxt from "../img/ready-txt.png";
import IntroCloud from "../img/intro-under-cloud.png";

const Intro = ({ updateTime }) => {
  useEffect(() => {}, []);

  return (
    <div>
      <div className="yass-gp hide">
        <div className="say-txt ">Say</div>
        <img src={yass} alt="" />
        <div className="say-txt txt-light">
          for <span className="txt-regular">FREE FLIGHTS</span>
        </div>
      </div>

      <div className="yass-gp sub-intro-2 hide">
        <img src={TenSec} alt="" />
      </div>

      <div className="yass-gp sub-intro-3">
        <img src={ReadyTxt} alt="" />
      </div>

      <img src={IntroCloud} alt="" className="intro-cloud" />
    </div>
  );
};

export default Intro;
