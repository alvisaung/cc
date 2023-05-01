import React, { Component, useEffect } from 'react';
import '../styles/welcome.css';

import DengueLogo from '../assets/images/logo.png';
import BishQr from '../assets/images/bishQr.png';
import YmcaQr from '../assets/images/ymcaQr.png';
import SkQr from '../assets/images/skQr.png';
import RightA from '../assets/images/rightArr.png';

const Welcome = (props) => {
  return (
    <React.Fragment>
      <div className="headerTxt">
        <div className="top">bored before you board?</div>
        <div className="btm">
          <span>game</span> before you go!
        </div>
      </div>
      <img src={DengueLogo} className="dengueLogo " alt="dengueLogo" />
      <div className="startYr">start your mozzie wipeout</div>
      <div
        className={`phOrPan ${
          props.screenFace === 'mobile' ? 'phOrPan-Mobile' : null
        }`}
      >
        {props.screenFace === 'machine' ? (
          <div className="welcomeQrGp">
            {props.currPanel === 'BISH' && (
              <img src={BishQr} alt="" className="qrPlay" />
            )}
            {props.currPanel === 'YMCA' && (
              <img src={YmcaQr} alt="" className="qrPlay" />
            )}
            {props.currPanel === 'SK' && (
              <img src={SkQr} alt="" className="qrPlay" />
            )}
            <div className="qrTxt">
              Scan to play on <br />
              your mobile devices
            </div>
          </div>
        ) : null}
        {props.screenFace === 'machine' ? <div className="or">OR</div> : null}
        <button
          className="tab btn welcomeTabStart"
          onClick={() => {
            props.nextPage('instruction');
          }}
        >
          tap to start
          <img src={RightA} alt="" />
        </button>
      </div>
    </React.Fragment>
  );
};
export default Welcome;
