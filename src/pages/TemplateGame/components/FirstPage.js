import { gsap } from "gsap";
import React from "react";
import { useEffect } from "react";

import FirstPageBg from "../images/first-page-bg.jpg";
import FirstPageTxt from "../images/first-page-txt.png";

export default function FirstPage({ nextPage, currPage, checkClose }) {
  useEffect(() => {
    if (currPage == "#first-page") {
      // gsap.set(".first-page-sbtn-ref", { scale: 0 });
      // gsap.to(".first-page-btn-ref", { scale: 1, ease: "elastic.out(1, 0.75)", duration: 1, delay: 0.4 });
    } else {
      // gsap.set(".first-page-btn-ref", { scale: 0 });
    }
  }, [currPage]);
  const onStart = () => {
    checkClose();

    nextPage("#first-page", "#second-page");
  };

  return (
    <div id="first-page">
      <img src={FirstPageBg} alt="First Page Bg" className="bg" />
      <img src={FirstPageTxt} alt="First Page Bg" className="txt" />
      <button className="play-btn btn first-page-btn-ref" onClick={() => onStart()}>
        PLAY NOW
      </button>
    </div>
  );
}

const image_url = "https://assets.cc.ninetyfivegroup.com/images/japcur";
