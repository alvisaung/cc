import React, { Component } from 'react';
import '../styles/game.css';
import '../styles/instruction.css';

import Card from './Card';
import Time from './time';

function Game(props) {
  return (
    <div className="game">
      <div className="gamePlay">
        {props.time.preCountDown === -1 ? (
          <Time time={props.time} />
        ) : (
          <div className="sec">
            {props.time.preCountDown > 9
              ? props.time.preCountDown
              : '0' + props.time.preCountDown}
          </div>
        )}
      </div>
      <div className="stopDengueTxt">
        stop dengue with
        <br></br>
        <span>b-l-o-c-k.</span>
      </div>
      <div className="cardGp">
        {props.cards.map((c, index) => (
          <Card type={c} key={index} cardClick={props.clickFlip} />
        ))}
      </div>

      <div className="toRemember toNotice">
        <div id="break-pic-block">
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
        <div id="lift-pic-block">
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
        <div id="overturn-pic-block">
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
        <div id="change-pic-block">
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
        <div id="keep-pic-block">
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
    </div>
  );
}
export default Game;
