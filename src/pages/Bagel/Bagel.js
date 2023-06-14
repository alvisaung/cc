import { gsap } from "gsap";
import { Circ } from "gsap/dist/gsap";
import { Timeline } from "gsap/gsap-core";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./Bagel.scss";

import Burger1 from "./images/burger-1.png";
import Burger2 from "./images/burger-2.png";
import Burger3 from "./images/burger-3.png";
import Burger4 from "./images/burger-4.png";
import Burger5 from "./images/burger-5.png";
import Burger6 from "./images/burger-6.png";
import LockUp from "./images/fancy-txt.png";

const Bagel = () => {
  const [time, setTime] = useState({ hr: 0, min: 0 });
  const timeRef = useRef(null);

  const prevMin = useRef(null);
  const timeCreativeTxt = useRef(0);
  const creativeShow = useRef("#text-1");
  const burgerRound = useRef(1);
  const [amPm, setAmPm] = useState("AM");
  const widthRef = useRef(null);
  const hasAnimRef = useRef("true");

  const mainBurgers = useRef([
    { ref: ".center", top: "26%", left: "50%", origin_width: "30vw", currPostion: ".center" },
    { ref: ".right-top", top: "17%", left: "81%", origin_width: "25vw", currPostion: ".right-top" },
    { ref: ".right-btm", top: "63%", left: "83%", origin_width: "28vw", currPostion: ".right-btm" },
    { ref: ".left-btm", top: "70%", left: "-14%", origin_width: "35vw", currPostion: ".left-btm" },
    { ref: ".left-top", top: "12%", left: "-6%", origin_width: "20vw", currPostion: ".left-top" },
  ]);

  const prevCenter = useRef(mainBurgers.current[0]);

  const getSwapPosition = (toSwap) => {
    const result = mainBurgers.current.filter((burger) => burger.ref == toSwap);
    const { top, left, right, ref } = result[0];
    return { top, left, right, destRef: ref };
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let anim = urlParams.get("anim");
    hasAnimRef.current = anim;
    startCounting();

    if (anim == "true") {
      generateJump(".jump-center");
      setTimeout(() => {
        generateJump(".jump-right-top");
      }, 200);
      setTimeout(() => {
        generateJump(".jump-right-btm");
      }, 500);
      setTimeout(() => {
        generateJump(".jump-left-btm");
      }, 700);
      setTimeout(() => {
        generateJump(".jump-left-top");
      }, 900);
    }

    return () => {
      timeRef.current && clearInterval(timeRef.current);
    };
  }, []);

  const generateJump = (target) => {
    var tl = new Timeline({ repeat: -1, yoyo: true });
    tl.to(target, {
      duration: 0.8,
      y: 50,
      ease: Circ.easeIn,
    }).to(
      target,
      {
        duration: 0.2,
        scaleY: 0.9,
        scaleX: 1.1,
        transformOrigin: "bottom center",
        ease: Circ.easeInOut,
      },
      "-=.05"
    );
    return tl;
  };
  let a = 0;

  const updateTime = () => {
    onCreativeTime();
    const d = new Date();
    let hr = d.getHours();
    let hrFormat = hr >= 12 ? "PM" : "AM";
    setAmPm(hrFormat);
    hr = hr % 12;
    hr = hr ? hr : 12; // the hour '0' should be '12'
    hr = hr < 10 ? "0" + hr : hr;
    const minRaw = d.getMinutes();
    const min = minRaw < 10 ? "0" + minRaw : minRaw;
    setTime({ hr, min });
    // prevMin.current = min && hasAnimRef.current == "true" && moveBurger();
    if (a % 4 == 0) {
      moveBurger();
    }
    a++;
    // prevMin.current = min;
  };

  const onCreativeTime = () => {
    if (timeCreativeTxt.current > 8) {
      creativeAnim();
      timeCreativeTxt.current = 0;
      return;
    }
    timeCreativeTxt.current += 1;
  };

  const creativeAnim = () => {
    let hr = new Date().getHours();
    let alterTxt = "#text-2";
    if (hr == 6) {
      alterTxt = "#text-2";
    } else if (hr == 7) {
      alterTxt = "#text-3";
    } else if (hr >= 8 && hr < 10) {
      alterTxt = "#text-4";
    } else if (hr >= 10) {
      alterTxt = "#text-5";
    }
    const tl = gsap.timeline();
    if (creativeShow.current == "#text-1") {
      tl.set("#text-1", { display: "none", scale: 0, duration: 0.5 });
      tl.set(alterTxt, { display: "block", scale: 0 });
      tl.to(alterTxt, { scale: 1, ease: "elastic.out(1, 0.7)", duration: 2 });
      creativeShow.current = alterTxt;
      return;
    }
    tl.set(alterTxt, { display: "none", scale: 0 });
    tl.set("#text-1", { display: "block" });
    tl.to("#text-1", { scale: 1, ease: "elastic.out(1, 0.7)", duration: 2 });

    creativeShow.current = "#text-1";
  };

  const moveBurger = () => {
    const tl = gsap.timeline();
    const choseMain = mainBurgers.current[burgerRound.current];
    const { ref, currPostion, origin_width } = prevCenter.current;
    const toCorner = ref;
    const { top, left, destRef } = getSwapPosition(choseMain.currPostion);
    let _translateX = 0;
    let originWidth = origin_width;
    if (toCorner == ".center" && destRef == ".right-top") {
      _translateX = 180;
      const widthExtract = parseInt(originWidth.substring(0, 2));
      const newWidth = widthExtract - 8;
      originWidth = newWidth + "vw";
    }
    if (toCorner == ".left-btm" && destRef == ".left-top") {
      _translateX = -80;
    }
    if (toCorner == ".left-top" && destRef == ".right-top") {
      _translateX = 70;
    }
    if (toCorner == ".left-top" && destRef == ".right-top") {
      _translateX = 40;
    }
    if (toCorner == ".left-top" && destRef == ".left-btm") {
      _translateX = 80;
    }
    if (toCorner == ".right-top" && destRef == ".left-btm") {
      _translateX = 50;
    }
    if (toCorner == ".right-btm" && destRef == ".left-btm") {
      _translateX = 50;
    }

    if (toCorner == ".right-btm" && destRef == ".left-top") {
      _translateX = -50;
    }
    if (toCorner == ".center" && destRef == ".right-btm") {
      _translateX = 150;
    }
    if (toCorner == ".center" && destRef == ".left-btm") {
      _translateX = 150;
    }
    if (toCorner == ".center" && destRef == ".left-top") {
      _translateX = 50;
    }

    tl.to(toCorner, { left: left, top, duration: 1.5, translateX: _translateX, width: originWidth });

    const toCenter = choseMain.ref;

    const widthExtract = parseInt(choseMain.origin_width.substring(0, 2));
    let enlargeNum = 15;
    if (toCenter == ".left-btm") {
      enlargeNum = 7;
    }
    const newWidth = widthExtract + enlargeNum;
    let _left = "50%";
    if (toCenter == ".center") {
      _left = "69%";
    }
    gsap.to(toCenter, { left: _left, top: "26%", duration: 1.5, width: newWidth + "vw", translateX: "-50%" });

    let _mainBurgers = JSON.parse(JSON.stringify(mainBurgers.current));

    for (let i = 0; i < _mainBurgers.length; i++) {
      const burger = _mainBurgers[i];
      if (burger.ref == toCorner) {
        _mainBurgers[i].currPostion = choseMain.currPostion;
      }
      if (burger.ref == toCenter) {
        _mainBurgers[i].currPostion = currPostion;
      }
    }
    mainBurgers.current = _mainBurgers;
    prevCenter.current = choseMain;
    getRandom();
  };

  const getRandom = () => {
    if (burgerRound.current >= 4) {
      burgerRound.current = 0;
    } else {
      burgerRound.current += 1;
    }
  };

  const startCounting = () => {
    timeRef.current = setInterval(() => {
      updateTime();
    }, 1000);
  };

  return (
    <div id="bagel">
      <div className="time-gp" ref={widthRef}>
        {time.hr}
      </div>
      <div className="shit-gp">
        <div className="time-gp">{time.min}</div>
        <span className="am-type">{amPm}</span>
      </div>

      <img src={LockUp} alt="" id="text-1" className="lock-up-img" />
      <div className="creative-txt-gp" id="text-2">
        You're up early! <br /> Treat yourself to the <br /> <span>NEW</span> Breakfast Bagel!
      </div>
      <div className="creative-txt-gp" id="text-3">
        Still in sleep mode? <br /> Wake up to the <span>NEW</span> Breakfast Bagel!
      </div>
      <div className="creative-txt-gp" id="text-4">
        Beat the rush hour dread with <br /> the <span>NEW</span> Breakfast Bagel!
      </div>
      <div className="creative-txt-gp" id="text-5">
        Tick, tock, tick tock! <br /> It's the last hour to get the <br /> <span>NEW</span> Breakfast Bagel!
      </div>

      <img src={Burger1} alt="Center Burger" className={`float-burger right-top jump-right-top`} />
      <img src={Burger2} alt="Center Burger" className={`float-burger center jump-center`} />
      <img src={Burger4} alt="Center Burger" className={`float-burger right-btm jump-right-btm`} />
      <img src={Burger5} alt="Center Burger" className={`float-burger left-top jump-left-top `} />
      <img src={Burger6} alt="Center Burger" className={`float-burger left-btm  jump-left-btm`} />
    </div>
  );
};

export default Bagel;
