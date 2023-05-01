import React from "react";
import { useState } from "react";
import "./TemplateGame.css";
import { gsap } from "gsap";

// FirstPage
import { useEffect } from "react";
import SecondPage from "./components/SecondPage";
// Third Page
import GamePage from "./components/GamePage";

// FinalPage
import EmailPage from "./components/EmailPage";
import FinalPage from "./components/FinalPage";
import FirstPage from "./components/FirstPage";

import FirstTemplate from "./images/first-template.png";
import SecondTemplate from "./images/second-template.png";
import ThirdTemplate from "./images/third-template.png";

// Img
import BG from "./images/background.png";
import BgCover from "./images/background-cover.jpg";

//sound
import BgSound from "./images/bgSound.mp3";
import api from "services/api";
import { useRef } from "react";

export default function TemplateGame() {
  const [round, setRound] = useState(0);
  const [playId, setPlayId] = useState(null);
  const [email, setEmail] = useState("");
  const [currPage, setCurrPage] = useState();
  const [mergeImg, setMergeImg] = useState([]);
  const IDLE_TIME = 25;
  const idleTime = useRef(IDLE_TIME);
  const gameTimer = useRef(null);
  const currPageRef = useRef("#first-page");
  const radioRef = useRef("");
  const checkCloseRadioInterval = useRef(null);
  useEffect(() => {
    // nextPage("#first-page", "#final-page");
    console.log("Update");

    setCurrPage("#first-page");
    checkCloseInterval();
    checkIsCameraEnable();
    if (radioRef.current) {
      console.log("current");
      radioRef.current.volume = 0.5;
    }
    return () => {
      clearInterval(gameTimer.current);
      clearInterval(checkCloseRadioInterval.current);
    };
  }, []);

  window.BroadSignPlay = () => {
    console.log("BroadSign Run");
    checkClose();
    checkIsCameraEnable();
    console.log("Preload Imgs...");
  };

  const checkCloseInterval = () => {
    checkClose();
    checkCloseRadioInterval.current = setInterval(() => {
      checkClose();
    }, 1000 * 60 * 15);
  };
  const checkClose = () => {
    const currTime = new Date();
    console.log(currTime.getHours());
    if (currTime.getHours() >= 22 || currTime.getHours() < 7) {
      radioRef.current.pause();
    } else {
      radioRef.current.play();
      radioRef.current.loop = true;
    }
  };

  const checkIsCameraEnable = () => {
    navigator.permissions.query({ name: "camera" }).then((res) => {
      if (res.state == "denied") {
        alert("Allow camera permission to play the game.");
      }
    });
  };

  const startGameTimer = () => {
    gameTimer.current = setInterval(() => {
      if (currPageRef.current == "#first-page") {
        closeGameTime();
      } else if (idleTime.current == 0) {
        nextPage(["#second-page", "#game-page", "#email-page", "#final-page"], "#first-page", true);
      } else if (idleTime.current > 0) {
        idleTime.current = idleTime.current - 1;
      }
    }, 1000);
  };

  const closeGameTime = () => {
    clearInterval(gameTimer.current);
    gameTimer.current = null;
    setPlayId(null);
  };

  const handleResetTimer = () => {
    idleTime.current = IDLE_TIME;
  };

  const nextPage = (curr, dest, isRefresh) => {
    let tl = gsap.timeline();
    handleResetTimer();
    tl.set(dest, { display: "block" });
    tl.set(curr, { display: "none", autoAlpha: 0 });
    tl.to(dest, { ease: "power4.out", autoAlpha: 1, duration: 1.5 });
    currPageRef.current = dest;
    if (curr == "#first-page") {
      startGameTimer();
    } else if (dest == "#first-page") {
      closeGameTime();
    }
    setCurrPage(dest);
    if (!isRefresh && curr != "#game-page") handleTrack(curr);
  };

  const handleTrack = async (curr) => {
    const urlParams = new URLSearchParams(window.location.search);
    let panel = urlParams.get("panel");
    const payload = {
      panel: panel,
      clickType: "first-click",
      gameId: playId,
    };
    if (curr == "#first-page") {
      const res = await api.post("template-game/click", payload);
      setPlayId(res.data.gameId);
      return;
    } else if (curr == "#second-page") {
      payload.clickType = "second-click";
    } else if (curr == "play-click") {
      payload.clickType = "play-click";
    } else if (curr == "#email-page") {
      payload.clickType = "mail-click";
      payload.email = email;
      payload.images = JSON.stringify(mergeImg);
    }

    api.post("template-game/click", payload);
  };

  const handleStartPlay = () => {
    handleTrack("play-click");
    setRound(1);
    handleResetTimer();
  };

  const handleFinishPlay = () => {
    if (round === 3) {
      nextPage("#game-page", "#email-page");
      setRound(0);
    } else {
      setRound((prevRound) => prevRound + 1);
    }
  };

  const handleMerge = async (imgType, manSrc) => {
    var manImg = new Image();
    manImg.src = manSrc;
    await manImg.decode();
    let templateImg = null;
    var canvas = null;

    if (imgType == 1) {
      templateImg = document.getElementById("first-template");
      canvas = document.getElementById("canvas-1");
    } else if (imgType == 2) {
      templateImg = document.getElementById("second-template");
      canvas = document.getElementById("canvas-2");
    } else if (imgType == 3) {
      templateImg = document.getElementById("third-template");
      canvas = document.getElementById("canvas-3");
    }
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.clearRect(0, 0, 720, 1152);
    ctx.beginPath();

    const top = 349 * (829440 / 2073600);
    ctx.drawImage(manImg, 0, top + 32, 720, (720 * manImg.height) / manImg.width);
    templateImg.decode();
    ctx.drawImage(templateImg, 0, 0, 720, 1152);
    const imgData = canvas.toDataURL("image/png");
    console.log({ imgData });
    handleUpload(round, imgData);
  };
  const handleUpload = (round, imgData) => {
    api.post("template-game/upload", {
      round,
      playId,
      image: imgData,
    });
  };

  return (
    <div className="template-game">
      <img src={BG} alt="" className="bg" style={{ zIndex: 1111111 }} />
      <img src={FirstTemplate} crossorigin="anonymous" id="first-template" className="hide" />
      <canvas id="canvas-1" className="hide" width={720} height={1152}></canvas>

      <img src={SecondTemplate} crossorigin="anonymous" id="second-template" className="hide" />
      <canvas id="canvas-2" className="hide" width={720} height={1152}></canvas>

      <img src={ThirdTemplate} crossorigin="anonymous" id="third-template" className="hide" />
      <canvas id="canvas-3" className="hide" width={720} height={1152}></canvas>

      <img src={BgCover} alt="" className="bg" />
      <audio src={BgSound} ref={radioRef} volume={0.5} loop controls style={{ display: "none" }} />

      <FirstPage nextPage={nextPage} currPage={currPage} checkClose={checkClose} />
      <SecondPage nextPage={nextPage} currPage={currPage} />

      <GamePage handleStartPlay={handleStartPlay} handleFinishPlay={handleFinishPlay} round={round} currPage={currPage} handleUpdateImg={(newImg) => setMergeImg((prev) => [...prev, newImg])} handleMerge={handleMerge} FirstTemplate={FirstTemplate} SecondTemplate={SecondTemplate} ThirdTemplate={ThirdTemplate} />

      <EmailPage
        nextPage={nextPage}
        setEmail={(text) => {
          setEmail(text);
          handleResetTimer();
        }}
        email={email}
        currPage={currPage}
      />

      <FinalPage currPage={currPage} handlePlayAgain={() => nextPage("#final-page", "#first-page", true)} />
    </div>
  );
}

const image_url = "https://assets.cc.ninetyfivegroup.com/images/japcur";
