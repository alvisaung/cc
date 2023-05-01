import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Webcam from "react-webcam";
import { gsap } from "gsap";

const videoConstraints = {
  height: 1900,
  width: 1080,
  facingMode: "user",
};

export default function GamePage({ round, handleStartPlay, handleFinishPlay, currPage, handleMerge, FirstTemplate, SecondTemplate, ThirdTemplate }) {
  const WAIT_TIME = 3;
  const [countText, setCountText] = useState("");
  const countRef = useRef(WAIT_TIME);
  const playCounter = useRef();
  const webcamRef = useRef(null);

  useEffect(() => {
    return () => {
      clearInterval(playCounter && playCounter.current);
    };
  }, []);

  useEffect(() => {
    // if (currPage == "#game-page") {
    //   gsap.to(".playFrameRef", { scale: 1, ease: "elastic.out(1, 0.5)", duration: 1, delay: 0.4 });
    // } else {
    //   gsap.set(".playFrameRef", { scale: 0 });
    // }
  }, [currPage]);

  useEffect(() => {
    if (Boolean(round)) {
      startCounting();
      if (round === 2) {
        templateAnim("#second-template-ref", ["#first-template-ref", "#third-template-ref"]);
      } else if (round === 3) {
        templateAnim("#third-template-ref", ["#first-template-ref", "#second-template-ref"]);
      }
    } else {
      templateAnim("#first-template-ref", ["#second-template-ref", "#third-template-ref"]);
    }
  }, [round]);

  const templateAnim = (to_show, to_hide) => {
    gsap.set(to_hide, { autoAlpha: 0 });
    gsap.to(to_show, { autoAlpha: 1, duration: 1 });
  };

  const handlePlayAnim = () => {
    gsap.to(".hee-yahh-anim-ref", { scale: 1, ease: "elastic.out(1, 0.75)", duration: 1 });
  };

  const handleResetAnim = () => {
    gsap.to(".hee-yahh-anim-ref", { scale: 0 }, 0);
  };

  const startCounting = () => {
    playCounter.current = setInterval(() => {
      if (countRef.current > 0) {
        setCountText((prevTxt) => prevTxt + String(countRef.current) + ",");
      } else if (countRef.current == 0) {
        handlePlayAnim();
      } else if (countRef.current == -1) {
        takePic();
      } else if (countRef.current == -2) {
        handleFinishPlay();
        handleResetAnim();
        resetPlayCount();
        return;
      }
      countRef.current = countRef.current - 1;
    }, 1000);
  };

  const resetPlayCount = () => {
    clearInterval(playCounter.current);
    countRef.current = WAIT_TIME;
    setCountText("");
  };

  const takePic = async () => {
    const manPic = webcamRef.current.getScreenshot();
    handleMerge(round, manPic);
  };

  return (
    <div id="game-page">
      {round ? (
        <div className="counter-header">
          <div className="how-to-play ">{countText}</div>
          <div className="play-desc hee-yahh-anim-ref">Hee-yahhhhh! </div>
        </div>
      ) : (
        <>
          {/*  */}
          <div className="how-to-play play-title-ref ">How to Play?</div>
          <div className="play-desc  play-title-ref">Just step into the frame and pose in your most energetic way. </div>
        </>
      )}

      <img src={FirstTemplate} alt="" id="first-template-ref" />
      <img src={SecondTemplate} alt="" id="second-template-ref" />
      <img src={ThirdTemplate} alt="" id="third-template-ref" />

      <Webcam videoConstraints={videoConstraints} audio={false} ref={webcamRef} className={"camRef"} screenshotFormat="image/jpeg" screenshotQuality={1} mirrored={true} style={{ width: "100%", position: "absolute", left: 0, zIndex: 10 }} />

      {!round && (
        <>
          <button className="play-btn btn  playFrameRef" onClick={handleStartPlay}>
            POSE NOW
          </button>
          <div className="frame-goes-txt  play-desc playFrameRef">
            The frame goes by fast, <br />
            so keep up!
          </div>
        </>
      )}
    </div>
  );
}
const image_url = "https://assets.cc.ninetyfivegroup.com/images/japcur";
