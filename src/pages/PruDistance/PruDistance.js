import React, { useEffect, useRef, useState } from "react";
import "./PruDistance.scss";

import { gsap } from "gsap";

const nearDistance = [162, 270, 307, 438, 496];

const PruDistance = () => {
  const [near, setNear] = useState(false);
  const [distance, setDistance] = useState(500);

  const NearImg = [".Near1", ".Near2", ".Near3"];
  const AwayImg = [".Away1", ".Away2", ".Away3"];
  const rotateRef = useRef(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let distance = urlParams.get("distance");
    const is_near = nearDistance.includes(parseInt(distance));

    setDistance(distance);
    setNear(is_near);
    startRotate(is_near);
    fadePic(is_near);
    window.addEventListener("focus", restartAnim);

    return () => {
      window.removeEventListener("focus", restartAnim);
      rotateRef.current && clearInterval(rotateRef.current);
    };
  }, []);

  const restartAnim = () => {
    rotateRef.current && clearInterval(rotateRef.current);
    startRotate(near);
  };

  window.BroadSignPlay = () => {
    restartAnim();
  };

  //
  const startRotate = (is_near) => {
    const ten_sec = 1000 * 10;

    rotateRef.current = setInterval(() => {
      fadePic(is_near);
    }, ten_sec);
  };

  const prev_rand_num = useRef(-1);

  const fadePic = (within500) => {
    const imgGp = within500 ? NearImg : AwayImg;

    let randomNumber = Math.floor(Math.random() * 3);
    while (prev_rand_num.current == randomNumber) {
      randomNumber = Math.floor(Math.random() * 3);
    }

    prev_rand_num.current = randomNumber;

    const toShow = imgGp[randomNumber];

    const tl = new gsap.timeline();
    tl.to(imgGp, { opacity: 0, duration: 0 });
    tl.to(toShow, { opacity: 1, duration: 0, display: "block" });
    // document.getElementsByClassName(toShow)
  };

  return (
    <div className="pru-distance">
      {near && <div className="AlbertExtrabold distance">{distance}m ahead.</div>}
      <img src={"/images/pru-distance/near-1.png"} alt="Near" className="img Near1" />
      <img src={"/images/pru-distance/near-2.png"} alt="Near" className="img Near2" />
      <img src={"/images/pru-distance/near-3.png"} alt="Near" className="img Near3" />
      <img src={"/images/pru-distance/away-1.jpg"} alt="Near" className="img Away1" />
      <img src={"/images/pru-distance/away-2.jpg"} alt="Near" className="img Away2" />
      <img src={"/images/pru-distance/away-3.png"} alt="Near" className="img Away3" />

      {/* <img src={Near1} alt="Near" className="img Near1" />
      <img src={Near2} alt="Near" className="img Near2" />
      <img src={Near3} alt="Near" className="img Near3" />
      <img src={Away1} alt="Away" className="img Away1" />
      <img src={Away2} alt="Away" className="img Away2" />
      <img src={Away3} alt="Away" className="img Away3" /> */}
    </div>
  );
};

export default PruDistance;
