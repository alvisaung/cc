import React from "react";
import "./McdWorldCup.css";
import Ball from "./images/ball.png";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { gsap } from "gsap";
import Spicy from "./images/spicy.png";
import useWindowFocus from "use-window-focus";
import { monthShortName, panelData, weekday, CharShowingTime, matchDataDefault, ApiCallInterval, matchDataList } from "./Data";

export default function McdWorldCup() {
  const [set, setSet] = useState("B");
  const hasAnim = useRef(true);
  const date = new Date(2022, 10, 25, 18);
  const [matchCountDown, setMatchCountDown] = useState({ hr: "06", min: "43", front: "Wales", back: "Iran", time: "", time_new_line: "" });

  const [distance, setDistance] = useState(0);

  const idle_time_counter = useRef(0);
  const setA_anim_pointer = useRef(0);
  const api_call_counter = useRef(0);
  const first_frame_ref_gp = [".first-1", ".first-6", ".first-7", ".first-2", ".first-6", ".first-7", ".first-3", ".first-6", ".first-7", ".first-4", ".first-6", ".first-7", ".first-5", ".first-6", ".first-7"];
  const windowFocused = useWindowFocus();
  const gameTimerRef = useRef();

  const matchTimeRef = useRef([
    { month: 10, date: 24, hr: 18, min: 0, front: "Wales", back: "Iran" },
    { month: 10, date: 25, hr: 18, min: 0, front: "Wales", back: "Iran" },
  ]);

  useEffect(() => {
    if (windowFocused) {
      let toHide = first_frame_ref_gp.filter((frame, i) => setA_anim_pointer.current != i);
      toHide = toHide.map((hide) => hide + "-char");
      // gsap.set(toHide, { visibility: "hidden" });
    }
  }, [windowFocused]);

  useEffect(() => {
    gsap.set(".first-1-char", { visibility: "hidden" });
    startGame();
    return () => {
      gameTimerRef.current && clearInterval(gameTimerRef.current);
    };
  }, []);

  const startGame = () => {
    preRender();
    gameTimerRef.current = setInterval(() => {
      fetchLatestMatch();
      onFirstFrame();
    }, 1000);
  };

  const preRender = () => {
    const urlParams = new URLSearchParams(window.location.search);
    let set_param = urlParams.get("set");
    let panel_param = urlParams.get("panel");
    set_param = set_param.toUpperCase();
    console.log(set_param);

    setSet(set_param);
    // api.get("mcd-world-cups").then((res) => {
    matchTimeRef.current = matchDataList;
    countDownCalc();
    gsap.set(".first-1-char", { visibility: "visible" });
    hasAnim.current && gsap.from(".first-1-char", { visibility: "hidden", stagger: CharShowingTime, ease: "expo.out" }, "+=0");
    // });
    distanceCalc(panel_param);
  };
  const fetchLatestMatch = () => {
    if (api_call_counter.current == ApiCallInterval) {
      // api.get("mcd-world-cups").then((res) => {
      matchTimeRef.current = matchDataList;
      countDownCalc();
      // });
      api_call_counter.current = 0;
      return;
    }
    api_call_counter.current = 1 + api_call_counter.current;
  };
  const distanceCalc = (panel_id) => {
    if (!panel_id) {
      return;
    }
    let panel = panelData.filter((p) => p.panelId == panel_id);
    if (panel.length == 0) {
      alert("Wrong Panel ID");
      return;
    }
    panel = panel[0];
    const { distance, orientation } = panel;
    setDistance(distance);
    hasAnim.current = orientation == "PF";
  };
  const sortEvent = () => {
    let matchTimeList = matchTimeRef.current;
    matchTimeList = matchTimeList.filter((matchEvent) => {
      return new Date() < new Date(2022, matchEvent.month, matchEvent.date, matchEvent.hr, matchEvent.min);
    });
    if (matchTimeList.length == 0) {
      return matchDataDefault;
    } else {
      return matchTimeList[0];
    }
  };
  const countDownCalc = () => {
    const matchEvent = sortEvent();
    const matchDate = new Date(2022, matchEvent.month, matchEvent.date, matchEvent.hr, matchEvent.min);
    const currTime = new Date();
    const diffTime = matchDate - currTime;
    const diffMin = Math.ceil(diffTime / (1000 * 60));
    let min = Math.ceil(diffMin % 60);
    let hr = Math.floor(diffMin / 60);
    min = min < 10 ? `0${min}` : `${min}`;
    hr = hr < 10 ? `0${hr}` : `${hr}`;
    const { front, back } = matchEvent;
    const time = `${weekday[matchDate.getDay()]}, ${matchDate.getDate()} ${monthShortName[matchDate.getMonth()]} `;
    const twelveHr = matchEvent.hr % 12;
    const amPM = matchEvent.hr >= 12 ? "PM" : "AM";
    const time_new_line = `${date.getFullYear()}, ${twelveHr}${amPM}`;
    setMatchCountDown({ hr, min, front: front, back: back, time, time_new_line });
  };
  const onFirstFrame = () => {
    if (idle_time_counter.current > 8) {
      idle_time_counter.current = 0;
      frameAnim();
    }
    idle_time_counter.current += 1;
  };
  const frameAnim = () => {
    const anim_ref_hide = first_frame_ref_gp[setA_anim_pointer.current];
    if (setA_anim_pointer.current == 14) {
      setA_anim_pointer.current = 0;
    } else {
      setA_anim_pointer.current += 1;
    }
    const anim_ref_show = first_frame_ref_gp[setA_anim_pointer.current];
    hasAnim.current && gsap.set(anim_ref_show + "-char", { autoAlpha: 1 });
    const tl = gsap.timeline();
    tl.to(anim_ref_hide + "-char", { autoAlpha: 0, duration: 0.3 });
    if (hasAnim.current) {
      tl.from(anim_ref_show + "-char", { visibility: "hidden", stagger: CharShowingTime, ease: "expo.out" });
    } else {
      tl.to(anim_ref_show + "-char", { autoAlpha: 1, duration: 1, ease: "power2.easeOut" });
    }
  };

  const textSpliter = (text, animate_idx) => {
    let result = text.split("");
    return result.map((char, index) => (
      <span key={index} className={`${animate_idx}`}>
        {char}
      </span>
    ));
  };
  return (
    <div id="mcd-world-cup">
      <img src={Ball} alt="Ball" className={`ball ${hasAnim.current && "ball-animate"}`} />
      <div className="chicken-gp">
        <img src={Spicy} alt="Spicy" />
        <div className="chicken">
          Hawaiian Grilled <br /> Chicken Burger
        </div>
      </div>

      <div className="frame-wrapper">
        <div className="first-frame-txt first-1 ">
          <span className="red">
            {textSpliter("23", "first-1-char")}
            {textSpliter(" hours ", "first-1-char")}
            {textSpliter("11", "first-1-char")}
            {textSpliter(" mins", "first-1-char")}
          </span>
          {textSpliter(` to the next game. Wanna ${set == "A" ? "go to" : "order"} McDonald's?`, "first-1-char")}
        </div>
        <div className="first-frame-txt first-2 ">
          {textSpliter("It's a big game tonight.", "first-2-char")}
          <br /> {textSpliter(`Wanna ${set == "A" ? "go to" : "order"} McDonald's?`, "first-2-char")}
        </div>
        <div className="first-frame-txt first-3 frame-1-third  ">
          {textSpliter("No sports subscription nevermind.", "first-3-char")}
          <br /> {textSpliter(`Wanna ${set == "A" ? "go to" : "order"} McDonald's?`, "first-3-char")}
        </div>
        <div className="first-frame-txt first-4  ">
          {textSpliter("You, me, & late night football.", "first-4-char")} <br />
          {textSpliter(`Wanna ${set == "A" ? "go to" : "order"} McDonald's?`, "first-4-char")}
        </div>
        <div className="first-frame-txt first-5  frame-1-fourth">
          {textSpliter("Olé olé olé! There’s football today!", "first-5-char")}
          <br />
          {textSpliter(`Wanna ${set == "A" ? "go to" : "order"} McDonald’s?`, "first-5-char")}
        </div>
        <div className="first-frame-txt first-6 frame-1-sixth">
          {textSpliter(matchCountDown.front, "first-6-char")} {textSpliter("vs", "first-6-char")} {textSpliter(matchCountDown.back, "first-6-char")}
          <span className="red new-line">
            {textSpliter(matchCountDown.time, "first-6-char")} <br /> {textSpliter(matchCountDown.time_new_line, "first-6-char")} {textSpliter("SGT", "first-6-char")}
          </span>
        </div>
        <div className="first-frame-txt first-7 frame-1-seventh">
          {textSpliter(set == "A" ? `Visit the \n nearest outlet ${distance}m away!` : "Beat the queue ", "first-7-char")}
          <span className="red">{textSpliter(set == "B" ? "Schedule your delivery!" : "", "first-7-char")}</span>
        </div>
      </div>
    </div>
  );
}
