import React, { Component } from "react";
import "./Kaplan.css";
import { TweenLite, Power2, Sine } from "gsap";
import api from "services/api";
//slide Home posts
import Geek from "images/kaplan/greenHome.svg";
import DayDream from "images/kaplan/pinkHome.svg";
import FightBack from "images/kaplan/yellowHome.svg";
import Spending from "images/kaplan/redHome.svg";

//slide children posts
import pink1 from "images/kaplan/pink1.svg";
import pink2 from "images/kaplan/pink2.svg";
import pink3 from "images/kaplan/pink3.svg";

import yellow1 from "images/kaplan/yellow1.svg";
import yellow2 from "images/kaplan/yellow2.svg";
import yellow3 from "images/kaplan/yellow3.svg";
//imp red
import red1 from "images/kaplan/red1.svg";
import red2 from "images/kaplan/red2.svg";
import red3 from "images/kaplan/red3.svg";
//imp green
import green1 from "images/kaplan/green1.svg";
import green2 from "images/kaplan/green2.svg";
import green3 from "images/kaplan/green3.svg";

//imp carets
import caretLeft from "images/kaplan/caret-left.svg";
import caretRight from "images/kaplan/caret-right.svg";
//imp video
import firstPageVid from "images/kaplan/firstPage.mp4";
//imp open
import o from "images/kaplan/o.svg";
import p from "images/kaplan/p.svg";
import e from "images/kaplan/e.svg";
import fullPage from "images/kaplan/fullPage.svg";
import to from "images/kaplan/to.svg";
import n from "images/kaplan/n.svg";
//qr code
import homeQr from "images/kaplan/QR/homeQr.png";
import geekQr1 from "images/kaplan/QR/geekQr1.png";
import geekQr2 from "images/kaplan/QR/geekQr2.png";
import pinkQr1 from "images/kaplan/QR/pinkQr1.png";
import pinkQr2 from "images/kaplan/QR/pinkQr2.png";
import pinkQr3 from "images/kaplan/QR/pinkQr3.png";
import yellowQr1 from "images/kaplan/QR/yellowQr1.png";
import yellowQr2 from "images/kaplan/QR/yellowQr2.png";
import yellowQr3 from "images/kaplan/QR/yellowQr3.png";
import redQr1 from "images/kaplan/QR/redQr1.png";
import redQr2 from "images/kaplan/QR/redQr2.png";
import redQr3 from "images/kaplan/QR/redQr3.png";
//gif
import finicialFraud from "images/kaplan/newGif/finicialFraud.gif";
import Security from "images/kaplan/newGif/lock.gif";
import camera from "images/kaplan/newGif/camera.gif";
import redGif1 from "images/kaplan/newGif/handDollar.gif";
import redGif2 from "images/kaplan/newGif/global.gif";
import redGif3 from "images/kaplan/newGif/phonePopUp.gif";
import pinkGif1 from "images/kaplan/newGif/bulb.gif";
import pinkGif2 from "images/kaplan/newGif/videoPlay.gif";
import pinkGif3 from "images/kaplan/newGif/compDollor.gif";
import greenGif1 from "images/kaplan/newGif/game.gif";
import greenGif2 from "images/kaplan/newGif/compScreen.gif";
import greenGif3 from "images/kaplan/newGif/compEar.gif";
class App extends Component {
  state = {
    page: "page-start",
    panel_id: "",
    campaign_id: 1,
  };
  timer = 0;
  timerInterval;
  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    let panel = urlParams.get("panel");
    let panel_id = 1;
    if (panel == "orchard") {
      panel_id = 2;
    } else if (panel == "somerset") {
      panel_id = 3;
    }
    this.setState({ panel_id });
    this.timerInterval = setInterval(() => {
      if (this.state.page == "page-start") {
        this.timer = 0;
      } else {
        this.timer++;
        if (this.timer >= 30) {
          this.restart();
          this.timer = 0;
        }
      }
    }, 1000);
    this.video.addEventListener(
      "ended",
      () => {
        if (this.state.page == "page-start") {
          this.animateInit();
          TweenLite.to(`#page-start`, 0.3, { opacity: 0, display: "none" });
          TweenLite.to(`#page-options`, 0.5, {
            opacity: 1,
            display: "block",
            delay: 0.2,
          });
          this.setState({ page: "page-options" });
          this.timer = 15;
        }
      },
      false
    );
    this.video.currentTime = 2.2;
    this.video.play();
  }
  restart = () => {
    const { panel_id, campaign_id, page } = this.state;
    this.video.currentTime = 2.2;
    this.video.play();
    TweenLite.to(".pages", 0.3, { opacity: 0, display: "none", delay: 0.5 });
    TweenLite.to("#page-start", 0.3, { opacity: 1, display: "block", delay: 0.5 });
    this.setState({ page: "page-start" });
    setTimeout(() => {
      this.goOrigin();
      TweenLite.set("#o, #p, #e, #n", { left: "1100px" });
    }, 1000);
    if (page != "page-options") {
      api.post("analytic", { campaign_id, panel_id, screen_from: page, screen_to: "page-start", action: "idle" });
    }
  };
  componentWillUnmount() {
    clearInterval(this.timerInterval);
    this.video.removeEventListener("ended");
  }

  animateInit() {
    TweenLite.to("#o", 1.28, {
      ease: Power2.easeOut,
      left: "184px",
    });
    TweenLite.to("#p", 1.28, { ease: Sine.easeOut, left: "401px" });
    TweenLite.to("#e", 1.28, { ease: Sine.easeOut, left: "543px" });
    TweenLite.to("#n", 1.3, { ease: Sine.easeOut, left: "679px" });
  }

  goNext = (page1, page2, action = "") => {
    const { panel_id, campaign_id } = this.state;
    this.timer = 0;
    TweenLite.to(`#${page1}`, 0.3, { opacity: 0, display: "none" });
    TweenLite.to(`#${page2}`, 0.5, {
      opacity: 1,
      display: "block",
      delay: 0.2,
    });
    this.setState({ page: page2 });
    api.post(`analytic`, { campaign_id, panel_id, screen_from: page1, screen_to: page2, action });
  };
  onStartNext = () => {
    this.animateInit();
    this.goNext("page-start", "page-options");
    this.timer = 15;
  };
  toPageDetail = (pageToward) => {
    this.goNext(`page-options`, `${pageToward}`);
  };
  goBack = (currPage) => {
    this.goNext(currPage, "page-options", "Go Back");
    setTimeout(() => {
      this.goOrigin();
    }, 500);
  };
  goOrigin = () => {
    TweenLite.to(".firstSlide", 1, { left: "12%" });
    TweenLite.to(".secondSlide", 1, { left: 1200 });
    TweenLite.to(".thirdSlide", 1, { left: 1200 });
    TweenLite.set(".firstToSecond", { display: "block" });
    TweenLite.set(".secondBackFirst", { display: "none" });
    TweenLite.set(".secondToThird", { display: "none" });
    TweenLite.set(".thirdBackSecond", { display: "none" });
    TweenLite.set(".qr-1", { display: "block" });
    TweenLite.set(".qr-2", { display: "none" });
    TweenLite.set(".qr-3", { display: "none" });
  };
  firstSlideRight = () => {
    this.timer = 0;
    TweenLite.to(`.firstSlide`, 0.3, { left: -1100 });
    TweenLite.to(`.secondSlide`, 0.3, {
      left: "12%",
    });
    TweenLite.set(".firstToSecond", { display: "none" });
    TweenLite.set([".secondToThird", ".secondBackFirst"], {
      display: "block",
    });
    TweenLite.set(".thirdBackSecond", { display: "none" });
    TweenLite.set(".qr-1", { display: "none" });
    TweenLite.set(".qr-2", { display: "block" });
    TweenLite.set(".qr-3", { display: "none" });
  };
  secondSlideLeft = () => {
    this.timer = 0;
    TweenLite.to(`.secondSlide`, 0.3, { left: 1100 });
    TweenLite.to(`.firstSlide`, 0.3, {
      left: "12%",
    });
    TweenLite.set(".firstToSecond", { display: "block" });
    TweenLite.set(".secondBackFirst", { display: "none" });
    TweenLite.set(".secondToThird", { display: "none" });
    TweenLite.set(".thirdBackSecond", { display: "none" });
    TweenLite.set(".qr-1", { display: "block" });
    TweenLite.set(".qr-2", { display: "none" });
    TweenLite.set(".qr-3", { display: "none" });
  };
  secondSlideRight = () => {
    this.timer = 0;
    TweenLite.to(`.secondSlide`, 0.3, { left: -1100 });
    TweenLite.to(`.thirdSlide`, 0.3, {
      left: "12%",
    });
    TweenLite.set(".thirdBackSecond", { display: "block" });
    TweenLite.set(".secondBackFirst", { display: "none" });
    TweenLite.set(".secondToThird", { display: "none" });
    TweenLite.set(".firstToSecond", { display: "none" });
    TweenLite.set(".qr-1", { display: "none" });
    TweenLite.set(".qr-2", { display: "none" });
    TweenLite.set(".qr-3", { display: "block" });
  };
  thirdSlideLeft = () => {
    this.timer = 0;
    TweenLite.to(`.thirdSlide`, 0.3, { left: 1100 });
    TweenLite.to(`.secondSlide`, 0.3, {
      left: "12%",
    });
    TweenLite.set(".firstToSecond", { display: "none" });
    TweenLite.set(".secondBackFirst", { display: "block" });
    TweenLite.set(".secondToThird", { display: "block" });
    TweenLite.set(".thirdBackSecond", { display: "none" });
    TweenLite.set(".qr-1", { display: "none" });
    TweenLite.set(".qr-2", { display: "block" });
    TweenLite.set(".qr-3", { display: "none" });
  };
  render() {
    return (
      <div id="app">
        <div className="pages" id="page-start">
          <video width="100%" muted ref={(r) => (this.video = r)}>
            <source src={firstPageVid} type="video/mp4" />
          </video>
          <div className="full-btn" id="start-next" onClick={this.onStartNext} />
        </div>

        <div className="pages" id="page-options">
          <img src={fullPage} id="open-to" />
          <img src={o} id="o" className="letters" />
          <img src={p} id="p" className="letters" />
          <img src={e} id="e" className="letters" />
          <img src={to} id="to" className="letters" />
          <img src={n} id="n" className="letters" />
          <img src={homeQr} className="page-qrs qr-home" />
          <div className="kaplan_text">#OpenToKaplan</div>
          <div id="btns">
            <div className="btns" id="btn-daydream" onClick={() => this.toPageDetail("page-geeking")}>
              Geeking
            </div>
            <div className="btns" id="btn-spending" onClick={() => this.toPageDetail("page-daydream")}>
              Daydreaming
            </div>
            <div className="btns" id="btn-fighting" onClick={() => this.toPageDetail("page-fighting")}>
              fighting back
            </div>
            <div className="btns" id="btn-geeking" onClick={() => this.toPageDetail("page-spending")}>
              spending
            </div>
          </div>
        </div>
        {/* page daydream */}
        <div className="pages" id="page-daydream">
          <img src={pinkQr1} className="page-qrs qr-1" />
          <img src={pinkQr2} className="page-qrs qr-2" />
          <img src={pinkQr3} className="page-qrs qr-3" />
          <img src={DayDream} width="100%" className="bgPosts" />
          <div className="innerComponents">
            <div className="kaplan_text geek_text">#OpenToKaplan</div>

            <button className="secondBackFirst" onClick={() => this.secondSlideLeft()}>
              <img src={caretLeft} width="100%" className="caretLeft" />
            </button>
            <button className="thirdBackSecond" onClick={() => this.thirdSlideLeft()}>
              <img src={caretLeft} width="100%" className="caretLeft" />
            </button>
            <div className="firstSlide slides">
              <img src={pink1} width="100%" />
              <img src={pinkGif1} className="gifs gif1" id="pinkGif-1" />
            </div>
            <div className="secondSlide slides">
              <img src={pink2} width="100%" />
              <img src={pinkGif2} className="gifs gif2" id="pinkGif-2" />
            </div>
            <div className="thirdSlide slides">
              <img src={pink3} width="100%" />
              <img src={pinkGif3} className="gifs gif3" id="pinkGif-3" />
            </div>
            <button className="firstToSecond" onClick={this.firstSlideRight}>
              <img src={caretRight} width="100%" className="caretRight" />
            </button>
            <button className="secondToThird" onClick={this.secondSlideRight}>
              <img src={caretRight} width="100%" className="caretRight" />
            </button>
          </div>
          <button className="backBtns" onClick={() => this.goBack("page-daydream")}>
            {" "}
            \-{" "}
          </button>
        </div>
        <div className="pages" id="page-spending">
          <img src={Spending} width="100%" className="bgPosts" /> <img src={redQr1} className="page-qrs qr-1" />
          <img src={redQr2} className="page-qrs qr-2" />
          <img src={redQr3} className="page-qrs qr-3" />
          <div className="kaplan_text geek_text">#OpenToKaplan</div>
          <div className="innerComponents">
            <button className="secondBackFirst" onClick={() => this.secondSlideLeft()}>
              <img src={caretLeft} width="100%" className="caretLeft" />
            </button>
            <button className="thirdBackSecond" onClick={() => this.thirdSlideLeft()}>
              <img src={caretLeft} width="100%" className="caretLeft" />
            </button>
            <div className="firstSlide slides">
              <img src={red1} width="100%" />
              <img src={redGif1} className="gifs gif1" id="redGif-1" />
            </div>
            <div className="secondSlide slides">
              <img src={red2} width="100%" />
              <img src={redGif2} className="gifs gif2" id="redGif-2" />
            </div>
            <div className="thirdSlide slides">
              <img src={red3} width="100%" />
              <img src={redGif3} className="gifs gif3" id="redGif-3" />
            </div>

            <button className="firstToSecond" onClick={this.firstSlideRight}>
              <img src={caretRight} width="100%" className="caretRight" />
            </button>
            <button className="secondToThird" onClick={this.secondSlideRight}>
              <img src={caretRight} width="100%" className="caretRight" />
            </button>
          </div>
          <button className="backBtns" onClick={() => this.goBack("page-spending")}>
            {" "}
            /-{" "}
          </button>
        </div>
        {/* page fighting */}
        <div className="pages" id="page-fighting">
          <img src={yellowQr1} className="page-qrs qr-1" />
          <img src={yellowQr2} className="page-qrs qr-2" />
          <img src={yellowQr3} className="page-qrs qr-3" />
          <img src={FightBack} width="100%" className="bgPosts" /> <div className="kaplan_text geek_text">#OpenToKaplan</div>
          <div className="innerComponents">
            <button className="secondBackFirst" onClick={() => this.secondSlideLeft()}>
              <img src={caretLeft} width="100%" className="caretLeft" />
            </button>
            <button className="thirdBackSecond" onClick={() => this.thirdSlideLeft()}>
              <img src={caretLeft} width="100%" className="caretLeft" />
            </button>
            {/* gif */}

            <div className="firstSlide slides">
              <img src={yellow1} width="100%" />
              <img src={Security} className="gifs gif1" id="security" />
            </div>
            <div className="secondSlide slides">
              <img src={yellow2} width="100%" />
              <img src={finicialFraud} className="gifs gif2" id="finiancial-furd" />
            </div>
            <div className="thirdSlide slides">
              <img src={yellow3} width="100%" />
              <img src={camera} className="gifs gif3" id="camera-gif" />
            </div>
            <button className="firstToSecond" onClick={this.firstSlideRight}>
              <img src={caretRight} width="100%" className="caretRight" />
            </button>
            <button className="secondToThird" onClick={this.secondSlideRight}>
              <img src={caretRight} width="100%" className="caretRight" />
            </button>
          </div>
          <button className="backBtns" onClick={() => this.goBack("page-fighting")}>
            {" "}
            /-{" "}
          </button>
        </div>
        {/* page geeking */}
        <div className="pages" id="page-geeking">
          <div className="kaplan_text geek_text">#OpenToKaplan</div>
          <img src={geekQr1} className="page-qrs qr-1" />
          <img src={geekQr1} className="page-qrs qr-2" />
          <img src={geekQr2} className="page-qrs qr-3" />
          <img src={Geek} width="100%" className="bgPosts" />{" "}
          <div className="innerComponents">
            <button id="secondBackFirst" className="secondBackFirst" onClick={() => this.secondSlideLeft()}>
              <img src={caretLeft} width="100%" className="caretLeft" />
            </button>
            <button id="thirdBackSecond" className="thirdBackSecond" onClick={() => this.thirdSlideLeft()}>
              <img src={caretLeft} width="100%" className="caretLeft" />
            </button>
            <div className="firstSlide slides">
              <img src={green1} width="100%" />
              <img src={greenGif1} className="gifs gif1" id="greenGif-1" />
            </div>
            <div className="secondSlide slides">
              <img src={green2} width="100%" />
              <img src={greenGif2} className="gifs gif2" id="greenGif-2" />
            </div>
            <div className="thirdSlide slides">
              <img src={green3} width="100%" />
              <img src={greenGif3} className="gifs gif3" id="greenGif-3" />
            </div>
            <button id="firstToSecond" className="firstToSecond" onClick={this.firstSlideRight}>
              <img src={caretRight} width="100%" className="caretRight" />
            </button>
            <button id="secondToThird" className="secondToThird" onClick={this.secondSlideRight}>
              <img src={caretRight} width="100%" className="caretRight" />
            </button>
          </div>
          <button className="backBtns" onClick={() => this.goBack("page-geeking")}>
            {" "}
            /-{" "}
          </button>
        </div>
      </div>
    );
  }
}

export default App;
