import React, { Component } from "react";
import "../styles/thz.css";
import RightA from "../assets/images/rightArr.png";
import api from "services/api";

const Thanks = (props) => {
  return (
    <div className="thz">
      <div className="headTil">
        <span>Leaderboard</span>
      </div>
      <div className="gamePlay">
        <div className="sec">
          1<sup>ST</sup>:<span> {props.score[0]}s</span>
        </div>
        <div>
          2<sup>ND</sup>:<span> {props.score[1]}s</span>{" "}
        </div>{" "}
        <div className="miliSec">
          {" "}
          3<sup>RD</sup>:<span> {props.score[2]}s</span>{" "}
        </div>
      </div>
      <div className="stopDengueTxt">Thank you for playing! </div>
      <div className="remindAgain">
        Remember to <br></br> stop dengue with <span>B-l-o-c-k.</span>
      </div>
      <div className="toRemember toNotice ">
        <div>
          <div className="break-pic"></div>
          <div className="instructDetail">
            <span className="instructTitle">
              <span>b</span>reak
            </span>
            <div className="detail">
              up hardened <br /> soil
            </div>
          </div>
        </div>
        <div>
          <div className="lift-pic"></div>
          <div className="instructDetail">
            <span className="instructTitle">
              <span>l</span>ift
            </span>
            <div className="detail">
              and empty <br /> flowerpot plates
            </div>
          </div>
        </div>
        <div>
          <div className="overturn-pic"></div>

          <div className="instructDetail">
            <span className="instructTitle">
              <span>o</span>verturn
            </span>
            <div className="detail">
              pails and wipe
              <br /> their rims
            </div>
          </div>
        </div>
        <div>
          <div className="change-pic"></div>
          <div className="instructDetail">
            <span className="instructTitle">
              <span>c</span>hange
            </span>
            <div className="detail">
              water in <br /> vases
            </div>
          </div>
        </div>
        <div>
          <div className="keep-pic"></div>
          <div className="instructDetail">
            <span className="instructTitle">
              <span>k</span>eep
            </span>
            <div className="detail">
              roof gutters clear and <br /> place BTI insecticide
            </div>
          </div>
        </div>
      </div>
      <button className="btn memo  tap-play leader-play-agin-btn welcomeTabStart" id="playAgain_id" onClick={() => props.nextPage("game", "replay")} style={{ marginTop: "4vh" }}>
        Play again
        <img src={RightA} alt="" />
      </button>
      <div className={`qrGp ${props.screenFace === "mobile" ? "qrGp-mobile" : null}`}>
        {props.screenFace === "mobile" ? (
          <div className="logo-collect-pic"></div>
        ) : (
          <React.Fragment>
            <div className="follow-find-pic"></div>
            <div className="myEnv-pic"></div>
            <div className="googleStore-pic"></div>

            <div className="appStore-pic"></div>
          </React.Fragment>
        )}
        <div className="company-pic"></div>
      </div>
    </div>
  );
};

export default Thanks;
