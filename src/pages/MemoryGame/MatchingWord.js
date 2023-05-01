import React from "react";
import "./MatchingWord.css";
import WordCard from "./WordCard";

const MatchingWord = props => {
  if (props.wordCard == "TryAgain") {
    return (
      <div className="matchingComponent">
        <div className="matchTitle">
          <button>Try again!</button>{" "}
        </div>{" "}
        <img
          src={`${image_url}/memory/tryAgainFooter.svg`}
          className="tryAgainFoot"
        />
        <img
          src={`${image_url}/memory/retryBtn.svg`}
          className="retryBtn"
          onClick={props.onTryAgain}
        />
      </div>
    );
  }
  return (
    <div className="matchingComponent greatJobComponent">
      <div className="matchTitleGreatJob">
        <img src={`${image_url}/memory/greatJobTxt.svg`} width="50%" />
      </div>{" "}
      <WordCard wordCard={props.wordCard} />
      <div className="matchingFooter">
        <div className="attractive-prices">
          Stand a chance to win attractive prices!{" "}
        </div>{" "}
        <div className="snapUs"> Snap this screen and tag us </div>
        <span>#engineerwhatsnext</span>
        <img src={`${image_url}/memory/fbIntIcon.svg`} className="fbIntIcon" />
        <div className="success_playAgain">
          <button className="success_playAgain_btn" onClick={props.onTryAgain}>
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

const image_url = "https://assets.cc.quanterdynamic.com/images";

export default MatchingWord;
