import React, { Component, useEffect } from 'react';
import { TweenLite, Back, TimelineLite } from 'gsap';
import RightA from '../assets/images/rightArr.png';

import '../styles/instruction.css';

const Instructions = (props) => {
  return (
    <div>
      <div className="howToPlay">Here's how to play</div>

      <div className="ani-one">
        <button className="btn memo ani-st-1">step 1: Memorise</button>

        <div className="instruct instruct-ani-one">
          Remember <span>B-L-O-C-K</span> steps to do the Mozzie Wipeout.
        </div>
        <div className="toRemember  ani-one-control">
          <div className="ani-one-break">
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
          <div className="ani-one-lift ">
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
          <div className="ani-one-overturn">
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
          <div className="ani-one-change">
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
          <div className="ani-one-keep">
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
        <button
          className="btn memo ani-tap-1 ani-one tap-play welcomeTabStart"
          onClick={() => {
            props.nextAnim();
          }}
        >
          Continue
          <img src={RightA} alt="" />
        </button>
      </div>

      <button className="btn memo ani-st-2 ani-two">step 2: Match</button>
      <div className="instruct ani-two instruct-ani-two">
        Flip the cards and match the steps to the <br></br>
        breeding spots as fast as you can. Good luck!
      </div>
      <div className="demo ani-two">
        <div className="up">
          <div className="card break-1-demo">
            <div className={`break-pic back c dengueFront-break `}></div>
            <div className={`dengueFlip front c dengueBack-break`}></div>
          </div>
          <div className="card lift-1-demo">
            <div className={`lift-pic back c  dengueFront-lift`}></div>
            <div className={`dengueFlip front c dengueBack-lift`}></div>
          </div>
        </div>
        <div className="down">
          <div className="card lift-2-demo">
            <div className={`lift-pic-2 back c  dengueFront-lift2`}></div>
            <div className={`dengueFlip front c dengueBack-lift2`}></div>
          </div>
          <div className="card break-2-demo">
            <div className={`break-pic-2 back c  dengueFront-break2`}></div>
            <div className={`dengueFlip front c dengueBack-break2`}></div>
          </div>
        </div>
      </div>
      <button
        className="btn memo ani-tap-2 ani-two tap-play welcomeTabStart"
        id="toGame"
        onClick={() => {
          props.nextPage('game');
        }}
      >
        Tap to play
        <img src={RightA} alt="" />
      </button>
    </div>
  );
};
export default Instructions;
