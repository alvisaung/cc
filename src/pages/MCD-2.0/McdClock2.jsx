import React, { useEffect, useRef, useState } from "react";
import "./MCDClock2.scss";
import Logo from "./img/logo.png";
import Feel from "./img/feel.png";
import The from "./img/the.png";
import Wave from "./img/wave.png";
import bagel from "./img/bagel.png";
import { Bounce, Elastic, gsap } from "gsap";
import HumanBounce from "./img/bagel.mp4";

const McdClock2 = () => {
  const textRef = useRef(null);
  const animate_char = [".b-char", ".o-char", ".u-char", ".n-char", ".c-char", ".e-char"];
  const timeRef = useRef(null);
  const videoRef = useRef(null);
  const counter = useRef(1);

  const [time, setTime] = useState({ hr: 0, min: 0 });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let facing = urlParams.get("facing");
    facing = facing ? facing.toLocaleLowerCase() : "pf";
    if (facing == "pf") {
      startBounce();
    }
    startCounting(facing);
    return () => {
      timeRef.current && clearInterval(timeRef.current);
    };
  }, []);

  const startBounce = () => {
    gsap.set(animate_char, { opacity: 0 });
    setTimeout(() => {
      animate_char.forEach((char, i) => {
        const delay = char == ".e-char" ? i * 0.15 : i * 0.14;
        const tl = new gsap.timeline({ delay });
        let xy_first = init_xy_first;
        let xy_sec = init_xy_sec;
        if (char == ".o-char") {
          xy_sec = setting.o.xy_sec;
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

        tl.to(char, {
          scaleX: 1.4,
          scaleY: 0.8,
          duration: 0.1,
          ...xy_first,
        });

        tl.to(char, {
          scaleX: 0.8,
          scaleY: 1.2,
          duration: 0.2,
          ...xy_sec,
        });
        tl.to(char, {
          y: 0,
          scaleX: 1,
          scaleY: 1,
          duration: 0.1,
        });
        if (char == ".e-char") {
          tl.add(onBounceBall);
        }
      });
    }, 200);
  };

  const onBounceBall = () => {
    const tl = new gsap.timeline();
    tl.to(".wave", {
      y: 15,
      duration: 0.2,
    })
      .to(".wave", { y: 0, ease: Bounce.easeOut, duration: 0.1 })
      .to(".o-char", {
        y: -75,
        scaleX: 1.1,
        scaleY: 0.9,
        duration: 0.2,
      })
      .to(".o-char", {
        y: 0,
        scaleX: 1,
        scaleY: 1,
        ease: Bounce.easeOut,
      });
    // .to(".wave", { y: 0 }, "-=0.3");
  };

  const init_xy_first = {
    x: 0,
    y: 20,
    opacity: 1,
  };
  const init_xy_sec = {
    x: 0,
    y: -65,
  };
  const setting = {
    n: {
      xy_first: {
        y: 20,
        opacity: 1,
        scaleX: 0,
      },
      xy_sec: {
        y: -20,
        scaleX: 1,
      },
    },
    o: {
      xy_sec: {
        ...init_xy_sec,
        // duration: 0.24,
      },
    },
    c: {
      xy_first: {
        opacity: 0,
        x: -20,
        y: 20,
      },
      xy_sec: {
        opacity: 1,
        x: 0,
        y: -40,
      },
    },
    e: {
      xy_first: {
        opacity: 1,
        visibility: "hidden",
      },
      xy_sec: {
        visibility: "visible",
        scaleX: 1,
        x: 0,
        scaleY: 1,
      },
    },
  };

  const updateTime = () => {
    const d = new Date();
    let hr = d.getHours();
    // hr = hr % 12;
    // hr = hr ? hr : 12;
    hr = hr < 10 ? "0" + hr : hr;
    const minRaw = d.getMinutes();
    const min = minRaw < 10 ? "0" + minRaw : minRaw;
    setTime({ hr, min });
  };

  const startCounting = (facing) => {
    handleVdo();
    timeRef.current = setInterval(() => {
      updateTime();
      if (counter.current % 5 == 0 && facing == "pf") {
        startBounce();
      }
      // counter.current % 20 == 0 && videoRef.current
      if (facing == "pf") {
        handleVdo();
      }
      counter.current = (counter.current + 1) % 60;
    }, 1000);
  };

  const handleVdo = () => {
    videoRef.current.play();

    // setTimeout(() => {
    // videoRef.current.pause();
    // videoRef.current.currentTime = 0;
    // }, 1000 * 10);
  };

  return (
    <div id="McdClock2">
      {/* <img className="human" alt="Human" src={Human} /> */}
      <img className="logo" alt="logo" src={Logo} />

      <div className="feel-the">
        <img src={Feel} alt="Feel" />
        <img src={The} alt="Feel" className="the" />
      </div>
      <div className="bounce" ref={textRef}>
        <span className={`bounce-char b-char`}>B</span>
        <div className="wave-gp">
          <img src={bagel} alt="Bagel" className="bagel  o-char" />
          <img src={Wave} className="wave" alt="Wave" />
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
