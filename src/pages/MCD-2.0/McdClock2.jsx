import React, { useEffect, useRef, useState } from "react";
import "./MCDClock2.scss";
import Logo from "./img/logo.png";
import Wave1 from "./img/wave-1.png";
import Wave2 from "./img/wave-2.png";
import Wave3 from "./img/wave-3.png";
import bagel from "./img/bagel.png";
import { Bounce, gsap } from "gsap";
import HumanBounce from "./img/bagel.mp4";

const init_xy_first = {
  x: 0,
  y: 60,
  scaleX: 0.5,
  // opacity: 1,
};
const init_xy_sec = {
  x: 0,
  y: 0,
  scaleX: 1,
};
const setting = {
  o: {
    xy_first: {
      y: -40,
    },
    xy_sec: {
      y: 50,
    },
  },
  u: {
    xy_first: {
      y: 40,
    },
    xy_sec: {
      y: -30,
    },
  },
  n: {
    xy_first: {
      y: 40,
      transform: "rotate(-25deg)",
    },
    xy_sec: {
      y: -20,
      transform: "rotate(-8deg)",
    },
  },
  c: {
    xy_first: {
      x: -20,
      y: 30,
    },
    xy_sec: {
      x: 0,
      y: -20,
    },
  },
  e: {
    xy_first: {
      y: 20,
    },
    xy_sec: {
      x: 0,
      y: -10,
    },
  },
};
const McdClock2 = () => {
  const textRef = useRef(null);
  const animate_char = [".b-char", ".o-char", ".u-char", ".n-char", ".c-char", ".e-char"];
  const timeRef = useRef(null);
  const vdoTimeOut = useRef(null);
  const animTimeOut = useRef(null);
  const startBounceTimeOut = useRef(null);
  const feelTheTimeOut = useRef(null);
  const videoRef = useRef(null);
  const counter = useRef(1);
  const [time, setTime] = useState({ hr: 0, min: 0 });

  window.BroadSignPlay = () => {
    handleFocus();
  };
  const handleFocus = () => {
    // reset vdo
    console.log("FOcus");
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    feelTheTimeOut.current && clearTimeout(feelTheTimeOut.current);
    animTimeOut.current && clearTimeout(animTimeOut.current);
    startBounceTimeOut.current && clearTimeout(startBounceTimeOut.current);
    timeRef.current && clearInterval(timeRef.current);
    vdoTimeOut.current && clearTimeout(vdoTimeOut.current);
    counter.current = 1;
    GameStart();
  };
  useEffect(() => {
    GameStart();
    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("focus", handleFocus);
      timeRef.current && clearInterval(timeRef.current);
    };
  }, []);

  const startBounce = () => {
    const wave = [".wave1", ".wave2", ".wave3"];
    const feel_the = [".f", ".e-1", ".e-2", ".l", ".t", ".h", ".e-3"];

    gsap.set(animate_char, { scaleX: 0 });
    gsap.set(wave, { visibility: "hidden" });
    gsap.set(feel_the, { scaleY: 0, y: 20 });
    feelTheTimeOut.current = setTimeout(() => {
      new gsap.timeline({ delay: 0.1 }).staggerTo(feel_the, 0.3, { scaleY: 1, y: 0, ease: "back.out(3)" }, 0.12);
    }, 200);

    animTimeOut.current = setTimeout(() => {
      animate_char.forEach((char, i) => {
        const delay = i * 0.12;
        const tl = new gsap.timeline({ delay });
        let xy_first = init_xy_first;
        let xy_sec = init_xy_sec;
        if (char == ".o-char") {
          xy_first = setting.o.xy_first;
          xy_sec = setting.o.xy_sec;
        } else if (char == ".u-char") {
          xy_first = setting.u.xy_first;
          xy_sec = setting.u.xy_sec;
        } else if (char == ".n-char") {
          xy_first = setting.n.xy_first;
          xy_sec = setting.n.xy_sec;
        } else if (char == ".c-char") {
          xy_first = setting.c.xy_first;
          xy_sec = setting.c.xy_sec;
        } else if (char == ".e-char") {
          xy_first = setting.e.xy_first;
          xy_sec = setting.e.xy_sec;
        }
        xy_first = { ...init_xy_first, ...xy_first };
        xy_sec = { ...init_xy_sec, ...xy_sec };
        tl.to(char, {
          duration: 0.15,
          ...xy_first,
        });

        tl.to(char, {
          scaleX: 1.4,
          duration: 0.15,
          ...xy_sec,
        });

        tl.to(char, {
          y: 0,
          x: 0,
          scaleX: 1,
          scaleY: 1,
          duration: 0.15,
        });

        if (char == ".e-char") {
          tl.staggerTo(wave, 0.4, { visibility: "visible" }, 0.1);
          tl.to(
            ".o-char",
            {
              y: -90,
              scaleX: 1.1,
              scaleY: 0.9,
              duration: 0.2,
            },
            "-=0.3"
          ).to(".o-char", {
            y: 0,
            scaleX: 1,
            scaleY: 1,
            ease: Bounce.easeOut,
            delay: -0.1,
          });
        }
      });
    }, 800);
  };

  const updateTime = () => {
    const d = new Date();
    let hr = d.getHours();

    hr = hr < 10 ? "0" + hr : hr;
    const minRaw = d.getMinutes();
    const min = minRaw < 10 ? "0" + minRaw : minRaw;
    setTime({ hr, min });
  };

  const GameStart = () => {
    const urlParams = new URLSearchParams(window.location.search);
    let facing = urlParams.get("facing");
    facing = facing ? facing.toLocaleLowerCase() : "pf";
    startBounceTimeOut.current = setTimeout(() => {
      startBounce();
      handleVdo();
    }, 1500);

    timeRef.current = setInterval(() => {
      updateTime();
      if (counter.current % 10 == 0 && facing == "pf") {
        startBounce();
        handleVdo();
      }
      //
      counter.current = (counter.current + 1) % 60;
    }, 1000);
  };

  const handleVdo = () => {
    videoRef.current.currentTime = 0;
    videoRef.current.play();
  };

  return (
    <div id="McdClock2">
      {/* <img className="human" alt="Human" src={Human} /> */}
      <img className="logo" alt="logo" src={Logo} />

      <div className="feel-the">
        <span className="f">F</span>
        <span className="e-1">e</span>
        <span className="e-2">e</span>
        <span className="l">l</span>
        <span className="t">t</span>
        <span className="h">h</span>
        <span className="e-3">e</span>
        {/* 
        <img src={Feel} alt="Feel" />
        <img src={The} alt="Feel" className="the" /> */}
      </div>
      <div className="bounce" ref={textRef}>
        <span className={`bounce-char b-char`}>B</span>
        <div className="wave-gp">
          <img src={bagel} alt="Bagel" className="bagel  o-char" />
          <div className="wave-container">
            <img src={Wave3} className="wave wave3" alt="Wave" />
            <img src={Wave2} className="wave wave2" alt="Wave" />
            <img src={Wave1} className="wave wave1" alt="Wave" />
          </div>
        </div>
        <span className={`bounce-char u-char`}>u</span>
        <span className={`bounce-char n-char`}>n</span>
        <span className={`bounce-char c-char`}>c</span>
        <span className={`bounce-char e-char`}>e</span>
      </div>
      <video ref={videoRef} src={HumanBounce} muted className="humanbounce">
        Your browser does not support the video tag.
      </video>
      <div className="clock">
        <div>{time.hr}</div> <div>{time.min}</div>
      </div>
    </div>
  );
};

export default McdClock2;
