import gsap from "gsap";
import React from "react";
import { useEffect } from "react";
import FinalPageTxt from "../images/final-page-txt.png";

export default function FinalPage({ handlePlayAgain, currPage }) {
  useEffect(() => {
    // if (currPage == "#final-page") {
    //   gsap.to(".playAgainFrameRef", {
    //     scale: 1,
    //     translateX: "-50%",
    //     ease: "elastic.out(1, 0.5)",
    //     duration: 1,
    //     delay: 1,
    //   });
    // } else {
    //   gsap.set(".playAgainFrameRef", { scale: 0 });
    // }
  }, [currPage]);
  return (
    <div id="final-page">
      <img src={FinalPageTxt} alt="" className="japanese-txt" />
      <div className="txt">Power up with Japanese Curry from Subway</div>
      <div className="txt today-txt">today!</div>
      <button className="play-again-btn btn playAgainFrameRef " onClick={handlePlayAgain}>
        Play Again
      </button>
    </div>
  );
}

const image_url = "https://assets.cc.ninetyfivegroup.com/images/japcur";
