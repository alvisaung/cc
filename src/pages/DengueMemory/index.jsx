import React, { Component } from "react";
import party from "party-js";
import axios from "axios";

import Welcome from "./Pages/Welcome";
import Instructions from "./Pages/Instruction";
import "./styles/welcome.css";
import api from "services/api";

// Im
import Company from "./assets/images/company.png";
import Footer from "./assets/images/footer.png";
import ComicBubble from "./assets/images/comic-bubble.png";
import Game from "./Pages/Game";
import Thanks from "./Pages/Thanks";
import bgSound from "./assets/sounds/happy.wav";
import matchSound from "./assets/sounds/match.mp3";
import winSound from "./assets/sounds/win.mp3";

import { TweenLite, TimelineLite, Back, Elastic } from "gsap";

class DengueMemory extends Component {
  state = {
    currPage: "welcome",
    firstAcc: -1,
    pages: [".welcome", ".instruction", ".game", ".thz"],
    topPiccards: [
      {
        id: 1,
        img: "break-pic",
        checkImg: "break-pic",
        flip: false,
        done: false,
      },
      {
        id: 2,
        img: "lift-pic",
        checkImg: "lift-pic",
        flip: false,
        done: false,
      },
      {
        id: 3,
        img: "overturn-pic",
        checkImg: "overturn-pic",
        flip: false,
        done: false,
      },
      {
        id: 4,
        img: "change-pic",
        checkImg: "change-pic",
        flip: false,
        done: false,
      },
      {
        id: 5,
        img: "keep-pic",
        checkImg: "keep-pic",
        flip: false,
        done: false,
      },
    ],
    btmTxtCards: [
      {
        id: 6,
        img: "break-pic-2",
        checkImg: "break-pic",
        flip: false,
        done: false,
      },
      {
        id: 7,
        img: "lift-pic-2",
        checkImg: "lift-pic",
        flip: false,
        done: false,
      },
      {
        id: 8,
        img: "overturn-pic-2",
        checkImg: "overturn-pic",
        flip: false,
        done: false,
      },
      {
        id: 9,
        img: "change-pic-2",
        checkImg: "change-pic",
        flip: false,
        done: false,
      },
      {
        id: 10,
        img: "keep-pic-2",
        checkImg: "keep-pic",
        flip: false,
        done: false,
      },
    ],
    cards: [],
    time: { sec: 0, miliSec: 0, preCountDown: 10 },
    resetTime: 0,
    sound_src: null,
    bg_sound_play: null,
    panel: "test",
    id: "",
    score: [],
    screenFace: "",
  };
  count = 0;
  gameTime = 0;
  gamePreviewTime = 10000;
  gameTimeLimit = 128;
  timeLimit = 30;
  // audio

  bgSoundRef = null;
  matchSoundRef = null;
  winSoundRef = null;

  firstAnim = 7000;
  constructor() {
    super();
    console.log(typeof window.BoardSignPlay);
    if (typeof window.BoardSignPlay == "undefined") {
      window.BoardSignPlay = () => this;
    }
  }
  componentDidMount() {
    this.cardShuffle();
    this.resetTimeCount();
    this.getPanel();

    this.pageDivision("welcome");

    const g = document.getElementById("toGame");

    g.addEventListener("click", () => {
      this.bgSoundRef.play();
    });

    const again = document.getElementById("playAgain_id");

    again.addEventListener("click", () => {
      this.bgSoundRef.play();
    });
  }
  pageDivision = (nextPage, replay) => {
    this.nextPage(nextPage);
    this.setState({ resetTime: 0 });

    if (nextPage == "instruction") {
      this.instructAnim();
      api
        .post(`dengue-memory/create`, {
          panel: this.state.panel,
          is_mobile: this.state.screenFace === "mobile" ? true : false,
          note: "rest",
        })
        .then(
          (res) => {
            this.setState(
              {
                id: res.data.id,
              },
              () => {
                console.log("Status => Section Created", res.data.id);
              }
            );
          },
          (err) => {
            console.log(err);
          }
        );
    } else if (nextPage === "game") {
      this.restartCount();
      api
        .post(`dengue-memory/update/${this.state.id}`, {
          event: replay ? "replay" : "game",
          note: "nope",
        })
        .then(
          (res) => {
            console.log(`Status => ${replay ? "Replay Update" : "Game"}`);
          },
          (err) => {
            console.log("err", err);
          }
        );

      api.get(`dengue-memory/score/`).then(
        (res) => {
          let score = [];
          for (let i = 0; i < res.data.length; i++) {
            const e = res.data[i];
            if (e.score) {
              score.push(e.score);
            }
          }
          console.log(res.data);
          score.sort((a, b) => a - b);
          this.setState({ score });
        },
        (err) => {
          console.log("err", err);
        }
      );
      this.countTime(false);
    } else if (nextPage === "thz") {
      api
        .post(`dengue-memory/update/${this.state.id}`, {
          event: "thz",
          note: "thz",
        })
        .then(() => {
          console.log("Status => Thz");
        });
      this.resetCards();
      this.cardShuffle();
      this.coreThzAnim();
    }
  };
  getPanel = () => {
    const urlParams = new URLSearchParams(window.location.search);
    let panel = urlParams.get("panel");
    let screenFace = urlParams.get("interface");
    console.log("Screen: ", screenFace);
    console.log("Panel: ", panel);
    this.setState({ panel, screenFace });
  };

  resetTimeCount = () => {
    this.gameTime = setInterval(() => {
      if (this.state.resetTime >= this.timeLimit) {
        if (this.state.id) {
          api
            .post(`dengue-memory/update/${this.state.id}`, {
              event: "idle",
              note: "instruct",
            })
            .then(() => {
              console.log("Status => IDLE");
              this.resetToStart();
            });
        }
      }
      // console.log('Chase', this.state.resetTime);
      // console.log('Dest:', this.timeLimit);
      this.setState({ resetTime: this.state.resetTime + 1 });
    }, 1000);
  };
  resetToStart = () => {
    this.setState({ id: null });

    this.restartCount(true);
    this.resetCards();
    this.cardShuffle();
    this.pageDivision("welcome");
    this.setState({ resetTime: 0 });
    this.bgSoundRef.pause();
    this.bgSoundRef.currentTime = 0;
  };

  cardShuffle = () => {
    let { topPiccards, btmTxtCards } = this.state;
    topPiccards = topPiccards.sort(() => Math.random() - 0.5);
    btmTxtCards = btmTxtCards.sort(() => Math.random() - 0.5);
    let cards = topPiccards.concat(btmTxtCards);
    this.setState({ cards }, () => {});
  };
  resetCards = () => {
    // reset everything
    const { cards } = this.state;
    for (let i = 0; i < cards.length; i++) {
      const e = cards[i];
      e.flip = false;
      e.done = false;
    }
    this.setState({ time: { sec: 0, miliSec: 0, preCountDown: -1 } });
    clearInterval(this.count);
    this.previewCards(true);
  };
  countTime = () => {
    let c = 0;
    let sec = 0;
    let mili = 0;

    let randT = 0;
    this.count = setInterval(() => {
      if (randT === 0) {
        mili = Math.floor(Math.random() * (6 - 0) + 0);
      } else if (randT === 1) {
        mili = Math.floor(Math.random() * (11 - 6) + 5);
      } else if (randT === 2) {
        mili = Math.floor(Math.random() * (16 - 11) + 10);
      } else if (randT === 3) {
        mili = Math.floor(Math.random() * (21 - 16) + 15);
      } else if (randT === 4) {
        mili = Math.floor(Math.random() * (26 - 21) + 20);
      } else if (randT === 5) {
        mili = Math.floor(Math.random() * (31 - 26) + 25);
      } else if (randT === 6) {
        mili = Math.floor(Math.random() * (36 - 31) + 30);
      } else if (randT === 7) {
        mili = Math.floor(Math.random() * (41 - 36) + 35);
      } else if (randT === 8) {
        mili = Math.floor(Math.random() * (46 - 41) + 40);
      } else if (randT === 9) {
        mili = Math.floor(Math.random() * (51 - 46) + 45);
      } else if (randT === 10) {
        mili = Math.floor(Math.random() * (56 - 51) + 50);
      } else {
        randT = 0;
        mili = Math.floor(Math.random() * (60 - 56) + 55);
      }

      if (c == 12) {
        c = 0;
        sec += 1;
        this.setState({ time: { sec, miliSec: mili, preCountDown: -1 } });
      }
      this.setState({ time: { sec, miliSec: mili, preCountDown: -1 } });
      c += 1;
      randT += 1;
    }, 83);
  };

  restartCount = (reAll) => {
    this.setState({ resetTime: 0 }, () => {
      if (reAll) {
        this.timeLimit = 35;
      } else {
        this.timeLimit = 15;
      }
    });
  };

  nextPage = (nextPage) => {
    const { pages } = this.state;
    let toHide = [];

    for (let i = 0; i < pages.length; i++) {
      const e = pages[i];
      if (e != "." + nextPage) {
        toHide.push(e);
      }
    }
    TweenLite.set(toHide, {
      autoAlpha: 0,
      display: "none",
    });
    TweenLite.to("." + nextPage, 1.5, {
      autoAlpha: 1,
      display: nextPage === "thz" ? "flex" : "block",
    });
    this.setState({ currPage: nextPage });
  };
  // GAME
  previewCards = (finish) => {
    const { cards } = this.state;

    if (!finish) {
      for (let i = 0; i < cards.length; i++) {
        const e = cards[i];

        e.flip = true;
        let j = e.id;
        setTimeout(() => {
          this.previewAnim(j, true);
        }, i * 200);
      }
    } else {
      let t = 0;
      for (let i = cards.length - 1; i >= 0; i--) {
        const e = cards[i];
        e.flip = false;
        let j = e.id;
        t += 1;

        setTimeout(() => {
          this.previewAnim(j, false);
        }, t * 200);
      }
    }
    this.setState({ cards });
  };

  previewAnim = (id, open) => {
    TweenLite.to(".dengue" + id, 0.5, {
      transform: `rotateY(${open ? "-180deg" : "0deg"} ) perspective(900px)`,
    });
    TweenLite.to(".dengueBack" + id, 0.5, {
      autoAlpha: `${open ? 0 : 1} `,
      display: `${open ? "none" : "block"} `,
    });
    TweenLite.to(".dengueFront" + id, 0.5, {
      autoAlpha: `${open ? 1 : 0} `,
      display: `${open ? "block" : "none"} `,
    });
  };
  checkFirstOrW = () => {
    const { cards } = this.state;
    let firstClick = true;
    for (let i = 0; i < cards.length; i++) {
      const e = cards[i];
      if (!e.done && e.flip) {
        firstClick = false;
      }
    }
    return firstClick;
  };
  clickCard = ({ id, flip, checkImg }) => {
    this.restartCount();
    const c = this.checkFirstOrW();
    if (c && !flip) {
      this.updateState(id, false, false);
      this.setState({ firstAcc: id });
    } else if (!flip) {
      this.checkAns(id, checkImg);
    }
    TweenLite.to(".dengue" + id, 0.5, {
      transform: "rotateY(-180deg) perspective(700px)",
    });
    TweenLite.to(".dengueFront" + id, 0.5, {
      autoAlpha: 1,
      display: "block",
    });
    TweenLite.to(".dengueBack" + id, 0.5, {
      autoAlpha: 0,
      display: "none",
    });
  };
  fadeoutBlock = (id) => {
    // var tl = new TimelineLite({ onComplete: this.completeFirst });
    var tl = new TimelineLite();
    tl.to(`#${id}`, 0.2, {
      scale: 1.2,
    });
    tl.to(`#${id}`, 1, {
      scale: 0.8,
      autoAlpha: 0.6,
      ease: Back.easeOut.config(1),
    });
  };
  fadeInBlock = () => {
    let blocks = ["#break-pic-block", "#lift-pic-block", "#overturn-pic-block", "#change-pic-block", "#keep-pic-block"];
    TweenLite.set(blocks, {
      autoAlpha: 1,
      scale: 1,
    });
  };
  checkAns = (id, checkImg) => {
    let { cards, firstAcc } = this.state;
    for (let i = 0; i < cards.length; i++) {
      const e = cards[i];
      if (e.id !== id && e.flip && !e.done && e.checkImg === checkImg) {
        this.updateState(id, false, true);
        this.updateState(firstAcc, false, true);
        this.fadeoutBlock(e.checkImg + "-block");
        console.log("match");
        TweenLite.to([".dengueConf" + id, ".dengueConf" + firstAcc], 0, {
          display: "none",
        });
        TweenLite.to([".dengueConf" + id, ".dengueConf" + firstAcc], 0.2, {
          display: "block",
        });
        TweenLite.to([".dengueConf" + id, ".dengueConf" + firstAcc], 0.2, {
          display: "none",
          delay: 20,
        });
        //actual
        this.matchSoundRef.play();
        setTimeout(() => {
          this.matchSoundRef.pause();

          setTimeout(() => {
            this.matchSoundRef.currentTime = 0;
          }, 100);
        }, 400);
        if (this.checkWinner()) {
          this.restartCount();

          clearInterval(this.count);
          party.screen();

          // this.winSoundRef.play();

          this.bgSoundRef.pause();

          this.bgSoundRef.currentTime = 0;
          this.bgSoundOff();
          api
            .post(`dengue-memory/score/${this.state.id}`, {
              score: this.state.time.sec + parseFloat((this.state.time.miliSec / 100).toFixed(2)),
            })
            .then(
              (res) => {
                console.log("Status => Score Update");
              },
              (err) => {
                console.log("err", err);
              }
            );
          let scList = this.state.score;
          if (!scList.includes(this.state.time.sec)) {
            scList.push(this.state.time.sec + parseFloat((this.state.time.miliSec / 100).toFixed(2)));
            console.log("Sclist beofre sort and pop", scList);
            scList.sort((a, b) => a - b);
            console.log("Sclist after sort ", scList);
            scList.pop();
          }

          this.setState({ score: scList });
          setTimeout(() => {
            this.comicAnim();
          }, 200);
          setTimeout(() => {
            this.comicAnim(true);
          }, 3300);
          setTimeout(() => {
            this.pageDivision("thz");
            this.fadeInBlock();
          }, 3800);
          // setTimeout(() => {
          //   this.bgSoundRef.play();
          // }, 2500);
        }
      } else if (e.id != id && e.flip && e.checkImg !== checkImg && !e.done) {
        setTimeout(() => {
          this.closeCard([id, firstAcc]);
        }, 500);
      }
    }
  };
  comicAnim = (close) => {
    TweenLite.to([".sec_id", ".semi_id", ".miliSec_id"], 0.1, {
      css: { className: "+=blink" },
    });
    if (close) {
      TweenLite.to([".sec_id", ".semi_id", ".miliSec_id"], 0.1, {
        css: { className: "-=blink" },
      });
    }
    // if (close) {
    //   TweenLite.set('#overlay', {
    //     autoAlpha: 0,
    //     display: 'none',
    //   });
    //   TweenLite.set(['.comic-control'], {
    //     display: 'none',
    //     scale: 0.7,
    //     autoAlpha: 0,
    //     x: '-50%',
    //     y: '-50%',
    //   });
    //   return;
    // }
    // TweenLite.set('#overlay', {
    //   autoAlpha: 0,
    //   display: 'none',
    // });
    // TweenLite.set(['.comic-control'], {
    //   display: 'none',
    //   scale: 0.7,
    //   autoAlpha: 0,
    //   x: '-50%',
    //   y: '-50%',
    // });
    // TweenLite.to(['.comic-control'], 0.9, {
    //   display: 'block',
    //   scale: 1,
    //   autoAlpha: 1,
    //   x: '-50%',
    //   y: '-50%',
    //   ease: Back.easeOut.config(2),
    // });
    // TweenLite.to('#overlay', 0.4, {
    //   display: 'block',
    //   autoAlpha: 1,
    // });
  };
  checkWinner = () => {
    let win = true;
    for (let i = 0; i < this.state.cards.length; i++) {
      const e = this.state.cards[i];
      if (!e.done) {
        win = false;
      }
    }
    return win;
  };

  closeCard = (idArr) => {
    let dFront = [];
    let d = [];
    let dBack = [];
    for (let i = 0; i < idArr.length; i++) {
      const id = idArr[i];
      dFront.push(".dengueFront" + id);
      d.push(".dengue" + id);
      dBack.push(".dengueBack" + id);
      this.updateState(id, true, false);
    }
    TweenLite.to(d, 0.5, {
      transform: "rotateY(0deg) perspective(700px)",
    });
    TweenLite.to(dFront, 0.5, {
      autoAlpha: 0,
      display: "none",
    });
    TweenLite.to(dBack, 0.5, {
      autoAlpha: 1,
      display: "block",
    });
  };
  updateState = (id, flip, updateDone) => {
    let { cards } = this.state;
    for (let i = 0; i < cards.length; i++) {
      const e = cards[i];
      if (updateDone) {
        if (e.id == id) {
          e.done = true;
        }
      } else {
        if (e.id == id) {
          e.flip = !flip;
        }
      }
    }
    this.setState({ cards });
  };
  // sound
  bgSound = () => {
    this.setState({ sound_src: bgSound });
  };

  bgSoundOff = () => {
    this.setState({ sound_src: null }, () => {
      console.log("Sound src", this.state.sound_src);
    });
  };

  // Instruction Animation
  instructAnim = () => {
    TweenLite.set([".ani-two"], { display: "none" });
    TweenLite.set([".ani-one"], { display: "block" });

    TweenLite.to([".ani-one-control", ".ani-st-1", ".ani-tap-1", ".instruct-ani-one"], 0, {
      autoAlpha: 0,
      scale: 0.6,
    });

    this.closeCards();
    this.timeLineInstOne();
  };
  closeCards = () => {
    this.cardFlipDemo(".break-1-demo", ".dengueFront-break", ".dengueBack-break", true);
    this.cardFlipDemo(".break-2-demo", ".dengueFront-break2", ".dengueBack-break2", true);
    this.cardFlipDemo(".lift-1-demo", ".dengueFront-lift", ".dengueBack-lift", true);
    this.cardFlipDemo(".lift-2-demo", ".dengueFront-lift2", ".dengueBack-lift2", true);
  };

  timeLineInstOne = () => {
    var tl = new TimelineLite({
      onComplete: this.completeFirst,
    });
    // var tl = new TimelineLite();

    TweenLite.set([".ani-one-control"], {
      display: "flex",
      autoAlpha: 0,
    });
    tl.to(".ani-st-1", 0.8, {
      display: "block",
      autoAlpha: 1,
      scale: 1,
      ease: Back.easeOut.config(2),
    });
    tl.to(".instruct-ani-one", 1, {
      display: "inline-block",
      autoAlpha: 1,
      scale: 1,
      ease: Back.easeOut.config(2),
    });
    tl.to([".ani-one-control"], 1.8, {
      autoAlpha: 1,
      scale: 1,
      ease: Back.easeOut.config(2),
    });
    tl.to([".ani-tap-1"], 0.3, {
      autoAlpha: 1,
      scale: 1,
      ease: Back.easeOut.config(2),
      delay: 0.4,
    });
  };

  completeFirst = (skipTime) => {
    if (skipTime) {
      clearTimeout(this.firstAnim);
      TweenLite.set([".ani-two"], {
        display: "block",
        autoAlpha: 0,
        scale: 0.6,
      });
      this.timeLineInstTwo();
      return;
    }

    this.firstAnim = setTimeout(() => {
      TweenLite.set([".ani-two"], {
        display: "block",
        autoAlpha: 0,
        scale: 0.6,
      });
      this.timeLineInstTwo();
    }, 7000);
  };
  timeLineInstTwo = () => {
    this.firstAnim = true;

    TweenLite.set([".ani-one"], { display: "none" });
    var tl = new TimelineLite({ onComplete: this.restartCount });
    this.flipTheC();

    tl.to(".ani-st-2", 0.8, {
      autoAlpha: 1,
      scale: 1,
      ease: Back.easeOut.config(2),
    });
    tl.to(".instruct-ani-two", 0.8, {
      autoAlpha: 1,
      scale: 1,
      ease: Back.easeOut.config(2),
    });

    tl.set(".demo", {
      scale: 1,
    });
    tl.to(".demo", 1.2, {
      display: "flex",
      autoAlpha: 1,
      ease: Back.easeOut.config(2),
      delay: 0.2,
    });
    tl.to(".ani-tap-2", 0.8, {
      display: "block",
      autoAlpha: 1,
      scale: 1,
      delay: 2.2,
      ease: Back.easeOut.config(2),
    });
  };
  flipTheC = () => {
    // 3200, 4200 , 5000, 5800

    setTimeout(() => {
      this.cardFlipDemo(".break-1-demo", ".dengueFront-break", ".dengueBack-break", false);
    }, 2400);
    setTimeout(() => {
      this.cardFlipDemo(".break-2-demo", ".dengueFront-break2", ".dengueBack-break2", false);
    }, 3300);
    setTimeout(() => {
      this.cardFlipDemo(".lift-1-demo", ".dengueFront-lift", ".dengueBack-lift", false);
    }, 4000);
    setTimeout(() => {
      this.cardFlipDemo(".lift-2-demo", ".dengueFront-lift2", ".dengueBack-lift2", false);
    }, 4800);
  };
  cardFlipDemo = (dengueC, front, back, close) => {
    TweenLite.to(dengueC, 0.5, {
      transform: `${close ? "rotateY(0deg)" : "rotateY(-180deg)"} `,
    });
    TweenLite.to(front, 0.5, {
      autoAlpha: `${close ? 0 : 1} `,
      display: `${close ? "none" : "block"} `,
    });
    TweenLite.to(back, 0.5, {
      autoAlpha: `${close ? 1 : 0} `,
      display: `${close ? "block" : "none"} `,
    });
  };
  //

  coreThzAnim = () => {
    TweenLite.set([".stopDengueTxt", ".remindAgain", ".leader-play-agin-btn", ".qrGp"], {
      autoAlpha: 0,
      scale: 0.6,
    });

    var tl = new TimelineLite({ onComplete: this.restartCount });
    tl.to(".stopDengueTxt", 0.8, {
      autoAlpha: 1,
      scale: 1,
      ease: Back.easeOut.config(2),
    });
    tl.to(".remindAgain", 0.8, {
      autoAlpha: 1,
      scale: 1,
      ease: Back.easeOut.config(2),
    });
    tl.to(".leader-play-agin-btn", 0.8, {
      autoAlpha: 1,
      scale: 1,
      ease: Back.easeOut.config(2),
    });
    tl.to(".qrGp", 0.8, {
      autoAlpha: 1,
      scale: 1,
      ease: Back.easeOut.config(2),
    });
  };

  render() {
    const { currPage, cards, time, score, screenFace, panel, id, showOverlay } = this.state;

    return (
      <div id="DengueMemory">
        {/* <ReactAudioPlayer
          src={bgSound}
          controls
          loop
          ref={(element) => {
            this.bgSoundRef = element;
          }}
        /> */}
        <audio
          ref={(input) => {
            this.bgSoundRef = input;
          }}
          src={bgSound}
          loop
          style={{ display: "none" }}
        />

        <audio
          ref={(input) => {
            this.matchSoundRef = input;
          }}
          src={matchSound}
          style={{ display: "none" }}
        />
        {currPage == "thz" ? null : <img src={Company} alt="" className="companyLogo " />}
        <div id="overlay"></div>
        <img src={ComicBubble} alt="" className="comic comic-control" />

        <div id="score-control-id" className=" comic-control">
          {time.sec + parseFloat((time.miliSec / 100).toFixed(2)) + "s"}
        </div>
        <div className="welcome">
          <Welcome nextPage={this.pageDivision} currPage={currPage} screenFace={screenFace} currPanel={panel} />
        </div>
        <div className="instruction">
          <Instructions nextPage={this.pageDivision} nextAnim={() => this.completeFirst(true)} />
        </div>
        <div className="game">
          <Game cards={cards} nextPage={this.pageDivision} clickFlip={this.clickCard} time={time} />
        </div>
        <Thanks nextPage={this.pageDivision} score={score} screenFace={screenFace} id={id} />
        <img src={Footer} alt="" className="footer" />
      </div>
    );
  }
}

export default DengueMemory;
