import React, { Component } from "react";

import "./WallySally.css";
import tCartoon from "./images/two-cartoon.png";
import tCartoonSec from "./images/two-cartoon-2.png";
import headerPreLogo from "./images/header-pre.png";
import footerPreLogo from "./images/footer-pre.png";
import deleteBtn from "./images/delete.png";
import song from "./images/shutter.mp3";
import dropletPress from "./images/droplet.mp3";

import { TweenMax, Power3, TweenLite, TimelineLite, Bounce, Back } from "gsap";
import Webcam from "react-webcam";
import { Power2 } from "gsap";

import api from "services/api";

class WallySally extends Component {
  constructor(props) {
    super(props);
    this.loopAnimateInt = null;
    this.camera = null;
    this.aCountDown = null;
    this.player = null;
    this.playerAgree = null;
  }
  state = {
    panel: 0,
    vdoCountDown: 5,
    appCountDown: 30,
    fImgUrl: "",
    sImgUrl: "",
    doneTake: false,
    takingSec: false,
    merge_url1: "",
    merge_url2: "",
    total_merge_url: "",
    retakeCount: 2,
    checkingPic: "second",
    mail: "",
    authMail: false,
    input_no: 0,
    accWebCamW: 0,
    sound_src: null,
    drop_let_src: null,
    totPreviewX: 0,
    totPreviewY: 0,
  };
  componentDidMount() {
    // this.goNext('preTake', 'previewTotal');
    const urlParams = new URLSearchParams(window.location.search);
    let panel = urlParams.get("panel");
    this.setState({ panel });
    const vdoLists = ["preTakeVdo", "preAgreeVdo", "previewTotalVdo"];
    let i = 0;
    while (i < vdoLists.length) {
      document.getElementById(vdoLists[i]).load();
      i += 1;
    }
    this.appCount();
    this.player.play();
    this.animateCommend(1500);

    TweenLite.set([".left-arr", ".right-arr"], { scale: 0, display: "none" });
    TweenLite.set([".preTakeTerm", ".preAgree", ".taking", ".preview", ".taking2", ".preview2", ".previewTotal", ".email", ".thz"], {
      autoAlpha: 0,
      display: "none",
    });
    TweenLite.set([".pretaketerm-animate-f-txt", ".pretake-animate-f-txt", ".sec-fortune", ".twoCart"], {
      autoAlpha: 0,
    });
    setTimeout(() => {
      this.switchAnimateTxt(true);
      this.loopAnimate();
    }, 1500);
    this.player.currentTime = 0;
    TweenLite.to(".flash", 0, { autoAlpha: 0, display: "none" });
    this.setState({ totPreviewX: (403 * window.innerWidth) / 1080, totPreviewY: (1000 * window.innerHeight) / 1920 });
    // this.mergeAll(false)
    // this.goNext('preTake', 'email')
  }

  componentDidUpdate(_, prevState) {
    if (prevState.totPreviewX != this.state.totPreviewX || prevState.totPreviewY != this.state.totPreviewY) {
      this.mergeAll(false, true);
    }
  }

  animateCommend = (time) => {
    TweenLite.set(".pretake-animate", { scale: 0 });
    setTimeout(() => {
      TweenLite.to(".pretake-animate", 1, {
        scale: 1,
        ease: Back.easeOut.config(2),
      });
    }, time);
  };
  animateShowTxt = (txt, time) => {
    setTimeout(() => {
      TweenLite.to(txt, 1.5, {
        autoAlpha: 1,
        ease: Power2.inOut,
      });
    }, time);
  };
  animateHideTxt = (txt) => {
    TweenLite.set(txt, { autoAlpha: 0 });
  };
  switchAnimateTxt = (preTake) => {
    if (preTake) {
      this.animateHideTxt(".pretaketerm-animate-f-txt");
      this.animateShowTxt(".pretake-animate-f-txt", 0);
    } else {
      this.animateHideTxt(".pretake-animate-f-txt");
      this.animateShowTxt(".pretaketerm-animate-f-txt", 0);
    }
  };
  loopAnimate = () => {
    let preTake = false;
    this.loopAnimateInt = setInterval(() => {
      this.switchAnimateTxt(preTake);
      preTake = !preTake;
    }, 6000);
  };

  appCount = () => {
    this.aCountDown = setInterval(() => {
      const nCountDown = this.state.appCountDown - 1;
      if (nCountDown === 0) {
        this.restartAll();
      } else {
        this.setState({ appCountDown: nCountDown });
      }
    }, 1000);
  };

  goNext = (curr, dest) => {
    // disappear
    this.setState({ appCountDown: 30 });

    TweenLite.to("." + curr, 0.4, {
      autoAlpha: 0,
      display: "none",
    });
    // show
    TweenLite.to("." + dest, 1, {
      autoAlpha: 1,
      display: "block",
    }).delay(0.2);
    if (dest == "taking" || dest == "taking2") {
      this.countDownTimer(dest);
    } else if (dest == "preAgree") {
      this.topBtnLogo();
      this.player.currentTime = 0;
      this.playerAgree.currentTime = 0;
      this.playerAgree.play();
    } else if (dest == "thz") {
      TweenLite.set(".finalTxt", { scale: 0, skewX: 0 });
      TweenLite.to(".finalTxt", 1.5, {
        scale: 1,
        ease: Power2.easeIn,
        skewX: -7,
      });
    } else if (dest == "preview2") {
      if (this.state.checkingPic == "second") {
        TweenLite.to(".left-arr", 1, {
          scale: 1,
          ease: Back.easeOut.config(3),
          display: "block",
        }).delay(1);
        TweenLite.set(".right-arr", { scale: 0, display: "none" });
      } else {
        TweenLite.to(".right-arr", 1, {
          scale: 1,
          ease: Back.easeOut.config(3),
          display: "block",
        }).delay(1);
        TweenLite.set(".left-arr", { scale: 0, display: "none" });
      }
    }
  };
  goPrev = (curr, dest) => {
    // disappear
    this.setState({ appCountDown: 30 });
    TweenLite.to("." + curr, 0.4, {
      autoAlpha: 0,
      display: "none",
    });
    // show
    TweenLite.to("." + dest, 1, {
      autoAlpha: 1,
      display: "block",
    }).delay(0.3);
  };
  countDownTimer = (dest, metaDest) => {
    if (dest == "taking2") {
      TweenLite.to(".sec-fortune", 1.4, {
        autoAlpha: 1,
        display: "block",
      }).delay(0.2);
    } else {
      TweenLite.to(".twoCart", 1.4, {
        autoAlpha: 1,
        display: "block",
      }).delay(0.2);
    }
    let count = setInterval(() => {
      TweenLite.set(".spinner", { autoAlpha: 0 });
      TweenLite.to(".countDown", 0, { autoAlpha: 0, scale: 0 });
      TweenLite.to(".countDown", 0.8, { autoAlpha: 1, scale: 1 }).delay(0.2);
      TweenLite.to(".spinner", 0.5, { autoAlpha: 1 }).delay(0.5);
      TweenLite.to(".flash", 0, { autoAlpha: 0, display: "none" });
      let newCount = this.state.vdoCountDown - 1;
      if (newCount == 0) {
        TweenLite.set([".spinner", ".sec-fortune", ".twoCart"], {
          autoAlpha: 0,
        });
        TweenLite.to(".flash", 0, { autoAlpha: 1, display: "flex" });
        setTimeout(() => {
          TweenLite.to(".flash", 0, { autoAlpha: 0, display: "none" });
          this.shutterSoundOff();
        }, 1000);

        setTimeout(() => {
          this.takePhoto(dest, metaDest);
        }, 500);

        this.shutterSound();
        clearInterval(count);
      } else {
        this.setState({ vdoCountDown: newCount });
      }
    }, 1000);
  };
  takePhoto = (dest, retake) => {
    let url = "";
    let canvas = "";
    let takingSec = false;

    url = this.camera.getScreenshot({ width: 1280, height: 720 });
    if ((!retake && dest == "taking") || (!retake && dest == "takingToPreview2")) {
      canvas = this.refs.canvas;
      takingSec = false;
    } else {
      canvas = this.refs.canvas2;
      takingSec = true;
    }
    this.mergeImg(url, canvas, dest, takingSec);
  };
  mergeImg = (url, canvas, dest, takingSec) => {
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let twoCart = new Image();
    twoCart.src = takingSec ? document.getElementById("secFotune").src : document.getElementById("twoCart").src;
    const oImg = new Image();
    oImg.src = url;
    twoCart.onload = () => {
      oImg.onload = () => {
        ctx.translate(window.innerWidth, 0);
        ctx.scale(-1, 1);
        ctx.moveTo(0, 0);

        ctx.drawImage(oImg, 0, 0, oImg.width, oImg.height, 0, 0, canvas.width, (720 * window.innerWidth) / 1080);
        ctx.translate(window.innerWidth, 0);
        ctx.scale(-1, 1);
        let cartHeight = (577 * window.innerWidth) / 1080;

        if (takingSec) {
          ctx.drawImage(twoCart, 0, 0, twoCart.width, twoCart.height, 0, canvas.height - cartHeight, window.innerWidth, cartHeight);
        } else {
          console.log({ h: canvas.height, twoC: twoCart.height });
          ctx.drawImage(twoCart, 0, 0, twoCart.width, twoCart.height, 0, canvas.height - cartHeight, window.innerWidth, cartHeight);
        }

        // ctx.scale(-1, 1);
        const merge_url = canvas.toDataURL();
        if (dest == "taking" || dest == "takingToPreview2") {
          if (dest == "taking") {
            this.setState(
              {
                doneTake: true,
                url,
                merge_url1: merge_url,
              },
              () => {
                TweenLite.to("#camera", 0, {
                  autoAlpha: 0,
                  display: "none",
                });
                TweenLite.set(".countDown", { autoAlpha: 0, scale: 0 });

                setTimeout(() => {
                  this.setState(
                    {
                      doneTake: false,
                      takingSec: true,
                      vdoCountDown: 5,
                    },
                    () => {
                      TweenLite.to("#camera", 1.5, {
                        autoAlpha: 1,
                        display: "block",
                      });

                      TweenLite.to(".countDown", 0, { autoAlpha: 0, scale: 0 });
                      TweenLite.to(".countDown", 0.8, {
                        autoAlpha: 1,
                        scale: 1,
                      }).delay(0.2);

                      this.countDownTimer("taking2");
                    }
                  );
                }, 2000);
              }
            );
          } else {
            this.setState({
              doneTake: false,
              vdoCountDown: 5,
              takingSec: false,
              url,
              merge_url1: merge_url,
            });
            this.goNext("taking", "preview2");
          }
        } else {
          TweenLite.set([".sec-fortune", ".twoCart"], {
            autoAlpha: 0,
          });
          this.setState(
            {
              doneTake: true,
              vdoCountDown: 5,
              url,
              merge_url2: merge_url,
            },
            () => {
              this.goNext("taking", "preview2");
            }
          );
        }
      };
    };
  };
  videoConstraints = {
    height: 720,
    width: 1280,
    facingMode: "user",
  };

  topBtnLogo = () => {
    const c = this.refs.canvasPreviewTot;
    const ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.rect(0, 0, c.width, c.height);
    ctx.fillStyle = "white";
    ctx.fill();
    const topLogo = new Image();
    topLogo.src = document.getElementById("topLogo").src;
    topLogo.onload = () => {
      let height = (topLogo.height * c.width) / topLogo.width;
      ctx.drawImage(topLogo, 0, 0, topLogo.width, topLogo.height, 5, 5, c.width - 10, height);
    };
  };
  loadImage = async (url, elem) => {
    return new Promise((resolve, reject) => {
      elem.onload = () => resolve(elem);
      elem.onerror = reject;
      elem.src = url;
    });
  };

  mergeAll = async (fromEmail, juzMerge) => {
    this.addition();
    const { merge_url1, merge_url2 } = this.state;
    const c = this.refs.canvasPreviewTot;
    const ctx = c.getContext("2d");
    let canvsWidth = c.width;
    const topLogo = new Image();
    this.topBtnLogo();
    let topLogoPic = document.getElementById("topLogo").src;
    await this.loadImage(topLogoPic, topLogo);
    let tHeight = (topLogo.height * canvsWidth) / topLogo.width;
    const firstPho = new Image();
    await this.loadImage(merge_url1, firstPho);
    let firstPhoHeight = (firstPho.height * canvsWidth) / firstPho.width - 10;
    ctx.drawImage(firstPho, 0, 0, firstPho.width, firstPho.height, 5, tHeight, canvsWidth - 10, firstPhoHeight);

    const secPho = new Image();
    await this.loadImage(merge_url2, secPho);
    let secPhoHeight = (secPho.height * canvsWidth) / secPho.width - 10;
    ctx.drawImage(secPho, 0, 0, secPho.width, secPho.height, 5, tHeight + firstPhoHeight, canvsWidth - 10, secPhoHeight);

    const footLogo = new Image();
    footLogo.crossOrigin = "anonymous";
    footLogo.src = document.getElementById("footLogo").src;
    footLogo.onload = () => {
      let height = (footLogo.height * canvsWidth) / footLogo.width;
      ctx.drawImage(footLogo, 0, 0, footLogo.width, footLogo.height, 5, tHeight + firstPhoHeight + secPhoHeight, canvsWidth - 10, height);
    };
    const total_merge_url = c.toDataURL();
    this.setState({ total_merge_url });
    if (juzMerge) return;
    if (fromEmail) {
      this.goPrev("email", "previewTotal");
    } else {
      this.goNext("preview2", "previewTotal");
      this.setState({
        doneTake: false,
      });
    }
  };
  confuseOk = () => {
    TweenLite.to([".preTake", ".preTakeTerm", ".preAgree", ".taking", ".preview", ".taking2", ".email", ".thz"], 0, {
      autoAlpha: 0,
      display: "none",
    });
    this.mergeAll(false);
  };
  previewLeft = () => {
    this.setState(
      {
        checkingPic: "first",
        appCountDown: 30,
        takingSec: false,
      },
      () => {
        // to disappear
        TweenLite.to(".lastMerge", 0.5, {
          left: "100%",
          autoAlpha: 0,
          display: "none",
        });
        TweenLite.set([".sec-fortune", ".twoCart"], {
          autoAlpha: 0,
        });
        // to show
        TweenLite.to(".firstMerge", 0.75, {
          left: "9%",
          autoAlpha: 1,
          display: "block",
        });
        TweenLite.to(".right-arr", 0.9, {
          scale: 1,
          ease: Back.easeOut.config(3),
          display: "block",
        }).delay(0.7);
        TweenLite.set(".left-arr", { scale: 0, display: "none" });
      }
    );
  };

  previewRight = () => {
    this.setState(
      {
        checkingPic: "second",
        appCountDown: 30,
        takingSec: true,
      },
      () => {
        TweenLite.to(".lastMerge", 1, {
          left: "9%",
          autoAlpha: 1,
          display: "block",
        });
        TweenLite.set([".sec-fortune", ".twoCart"], {
          autoAlpha: 0,
        });
        TweenLite.to(".firstMerge", 0.75, {
          left: "-100%",
          autoAlpha: 0,
          display: "none",
        });
        TweenLite.to(".left-arr", 0.9, {
          scale: 1,
          ease: Back.easeOut.config(3),
          display: "block",
        }).delay(0.7);
        TweenLite.set(".right-arr", { scale: 0, display: "none" });
      }
    );
  };
  retakePhoto = (checkingPic) => {
    const newRetake = this.state.retakeCount - 1;
    this.addition();
    TweenLite.set([".left-arr", ".right-arr"], { scale: 0, display: "none" });

    if (checkingPic == "first") {
      this.setState({ retakeCount: newRetake, doneTake: false, appCountDown: 30 }, () => {
        this.countDownTimer("takingToPreview2");
        TweenLite.to("." + "preview2", 0.5, {
          autoAlpha: 0,
          display: "none",
        });
        // show
        TweenLite.to("." + "taking", 1, {
          autoAlpha: 1,
          display: "block",
        }).delay(0.2);
        // this.goNext('preview2', 'taking');
      });
    } else {
      this.setState({ retakeCount: newRetake, doneTake: false, appCountDown: 30 }, () => {
        TweenLite.to(".preview2", 0.5, {
          autoAlpha: 0,
          display: "none",
        });
        // show
        TweenLite.to(".taking", 1, {
          autoAlpha: 1,
          display: "block",
        }).delay(0.2);
        setTimeout(() => {
          this.countDownTimer("taking2", "previewTaking2");
        }, 400);

        // this.goNext('preview2', 'taking2');
      });
    }
  };
  handleDelete = () => {
    let { mail } = this.state;
    let newMail = mail.slice(0, -1);
    let nAuth = this.validateEmail(newMail);
    this.setState({ mail: newMail, authMail: nAuth, appCountDown: 30 });
  };
  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  handleKey = (e, byPhone) => {
    this.setState({ appCountDown: 30 });
    let { mail } = this.state;
    let newMail;
    if (byPhone) {
      newMail = e.target.value;
    } else {
      newMail = mail + e.currentTarget.dataset.id;
    }
    let nAuth = this.validateEmail(newMail);
    this.setState({
      mail: newMail,
      authMail: nAuth,
    });
  };
  sendMail = async () => {
    this.addition("email", "thz");
    const { merge_url1, merge_url2, total_merge_url, panel } = this.state;
    const images = [merge_url1, merge_url2, total_merge_url];
    const upload_img = await api.post("wally-sally/upload", {
      images: JSON.stringify(images),
      panel,
    });
    const { data } = upload_img;
    const response = await api.post("wally-sally/email", {
      id: data.id,
      email: this.state.mail,
    });
  };

  restartAll = () => {
    console.log("Restart All");
    clearInterval(this.loopAnimateInt);
    this.animateCommend(100);
    this.loopAnimate();
    const pages = [".preTakeTerm", ".preAgree", ".taking", ".preview", ".taking2", ".preview2", ".previewTotal", ".email", ".thz"];
    TweenLite.to([".left-arr", ".right-arr"], 0, { scale: 0, display: "none" });

    // show
    TweenLite.to(".preTake", 0.5, {
      left: "0%",
      autoAlpha: 1,
      display: "block",
    });
    TweenLite.set([".sec-fortune", ".twoCart"], {
      autoAlpha: 0,
    });
    this.player.currentTime = 0;
    TweenLite.to(pages, 1, {
      autoAlpha: 0,
      display: "none",
    });
    this.setState(
      {
        doneTake: false,
        retakeCount: 2,
        mail: "",
        vdoCountDown: 5,
        appCountDown: 30,
        checkingPic: "second",
        takingSec: false,
      },
      () => {
        clearInterval(this.aCountDown);
        this.appCount();
      }
    );
  };
  renderKeyboard = () => {
    const { email, input_no } = this.state;

    return (
      <div id="keyboard">
        {" "}
        {/* style={{ top: input_no==0 ? 530 : input_no==1 ? 630 : input_no==2 ? 730 : input_no==3 ? 830 : input_no==4 ? 930 : 1030  }}*/}
        <div className="krows" id="row1">
          <span className="kNum" onClick={(e) => this.handleKey(e)} data-id="1">
            1
          </span>
          <span className="kNum" onClick={(e) => this.handleKey(e)} data-id="2">
            2
          </span>
          <span className="kNum" onClick={(e) => this.handleKey(e)} data-id="3">
            3
          </span>
          <span className="kNum" onClick={(e) => this.handleKey(e)} data-id="4">
            4
          </span>
          <span className="kNum" onClick={(e) => this.handleKey(e)} data-id="5">
            5
          </span>
          <span className="kNum" onClick={(e) => this.handleKey(e)} data-id="6">
            6
          </span>
          <span className="kNum" onClick={(e) => this.handleKey(e)} data-id="7">
            7
          </span>
          <span className="kNum" onClick={(e) => this.handleKey(e)} data-id="8">
            8
          </span>
          <span className="kNum" onClick={(e) => this.handleKey(e)} data-id="9">
            9
          </span>
          <span className="kNum" onClick={(e) => this.handleKey(e)} data-id="0">
            0
          </span>
        </div>
        <div className="krows" id="row2">
          <span onClick={(e) => this.handleKey(e)} data-id="q">
            Q
          </span>
          <span onClick={(e) => this.handleKey(e)} data-id="w">
            W
          </span>
          <span onClick={(e) => this.handleKey(e)} data-id="e">
            E
          </span>
          <span onClick={(e) => this.handleKey(e)} data-id="r">
            R
          </span>
          <span onClick={(e) => this.handleKey(e)} data-id="t">
            T
          </span>
          <span onClick={(e) => this.handleKey(e)} data-id="y">
            Y
          </span>
          <span onClick={(e) => this.handleKey(e)} data-id="u">
            U
          </span>
          <span onClick={(e) => this.handleKey(e)} data-id="i">
            I
          </span>
          <span onClick={(e) => this.handleKey(e)} data-id="o">
            O
          </span>
          <span onClick={(e) => this.handleKey(e)} data-id="p">
            P
          </span>
          <span id="backSpace" onClick={() => this.handleDelete()}>
            {" "}
            <img src={deleteBtn} alt="" width="57" />
          </span>
        </div>
        <div className="krows" id="row3" style={{ justifyContent: "space-evenly" }}>
          <span onClick={(e) => this.handleKey(e)} data-id="a">
            A
          </span>
          <span onClick={(e) => this.handleKey(e)} data-id="s">
            S
          </span>
          <span onClick={(e) => this.handleKey(e)} data-id="d">
            D
          </span>
          <span onClick={(e) => this.handleKey(e)} data-id="f">
            F
          </span>
          <span onClick={(e) => this.handleKey(e)} data-id="g">
            G
          </span>
          <span onClick={(e) => this.handleKey(e)} data-id="h">
            H
          </span>
          <span onClick={(e) => this.handleKey(e)} data-id="j">
            J
          </span>
          <span onClick={(e) => this.handleKey(e)} data-id="k">
            K
          </span>
          <span onClick={(e) => this.handleKey(e)} data-id="l">
            L
          </span>
          {/* <span id="return" onClick={() => this.handleReturn()}>
            Return
          </span> */}
        </div>
        <div className="krows" id="row4">
          <span onClick={(e) => this.handleKey(e)} data-id="z">
            Z
          </span>
          <span onClick={(e) => this.handleKey(e)} data-id="x">
            X
          </span>
          <span onClick={(e) => this.handleKey(e)} data-id="c">
            C
          </span>
          <span onClick={(e) => this.handleKey(e)} data-id="v">
            V
          </span>
          <span onClick={(e) => this.handleKey(e)} data-id="b">
            B
          </span>
          <span onClick={(e) => this.handleKey(e)} data-id="n">
            N
          </span>
          <span onClick={(e) => this.handleKey(e)} data-id="m">
            M
          </span>
          <span onClick={(e) => this.handleKey(e)} data-id=".">
            .
          </span>
          <span onClick={(e) => this.handleKey(e)} data-id="-">
            -
          </span>
          <span onClick={(e) => this.handleKey(e)} data-id="_">
            _
          </span>
          <span onClick={(e) => this.handleKey(e)} data-id="@">
            @
          </span>
        </div>
        <div className="krows" id="row5">
          <span className="atMail" onClick={(e) => this.handleKey(e)} data-id="@gmail.com">
            @gmail.com
          </span>
          <span className="atMail" onClick={(e) => this.handleKey(e)} data-id="@hotmail.com">
            @hotmail.com
          </span>
          <span className="atMail" onClick={(e) => this.handleKey(e)} data-id="@yahoo.com">
            @yahoo.com
          </span>
          <span onClick={(e) => this.handleKey(e)} data-id=".com">
            .com
          </span>
        </div>
      </div>
    );
  };
  shutterSound = () => {
    this.setState({ sound_src: song });
  };
  shutterSoundOff = () => {
    this.setState({ sound_src: null });
  };
  dropletSound = () => {
    this.setState({ sound_src: dropletPress });
  };
  dropletSoundOff = () => {
    this.setState({ sound_src: null });
  };
  addition = (curr, dest, restartExp) => {
    this.dropletSound();
    setTimeout(() => {
      this.dropletSoundOff();
    }, 500);
    if (curr && dest) {
      this.goNext(curr, dest);
    }
    if (restartExp) {
      this.restartAll();
    }
  };
  render() {
    const { vdoCountDown, doneTake, merge_url1, merge_url2, retakeCount, checkingPic, mail, authMail, sound_src, drop_let_src, previewAllH, totPreviewX, totPreviewY } = this.state;
    return (
      <div className="WallySally ">
        <div className="preTake">
          <video
            ref={(player) => {
              this.player = player;
            }}
            loop
            autoPlay
            muted
            id="preTakeVdo"
            className="wally-vdo"
          >
            <source src={`${vdo_url}/PubBG1.mp4`} type="video/mp4" />
          </video>
          <div className="pretake-animate-f-txt pretake-txt f-txt">
            Meet water sally, the new water droplet in town! <br /> she is here to join her brother, water wally, <br></br> on water-saving missions to make every drop count.
          </div>
          <div className="pretaketerm-animate-f-txt pretake-txt f-txt">
            stand to win attractive prizes <br />
            when you take a photo <br />
            with water wally & sally!
          </div>
          <div className="pretake-animate  start-btn">
            <span className="start-btn-txt pretake-txt" onClick={() => this.addition("preTake", "preAgree")}>
              Start
            </span>
            <img src={`${img_url}/start-btn.png`} alt="Start Playing!" onClick={() => this.addition("preTake", "preAgree")} />
          </div>
        </div>
        <div className="preTakeTerm pages">
          <div className="start-btn">
            <span className="start-btn-txt pretake-txt" onClick={() => this.addition("preTakeTerm", "preAgree")}>
              Start
            </span>
            <img src={`${img_url}/start-btn.png`} alt="Start Playing" onClick={() => this.addition("preTakeTerm", "preAgree")} />
          </div>
        </div>
        <div className="preAgree pages">
          <video
            ref={(playerAgree) => {
              this.playerAgree = playerAgree;
            }}
            className="wally-vdo"
            loop
            id="preAgreeVdo"
            muted
          >
            <source src={`${vdo_url}/PubPhotobooth3.mp4`} type="video/mp4" />
          </video>
          {/* <video   className='wally-vdo' loop  autoPlay     id="previewTotalVdo"  muted
          >
            <source src={`${vdo_url}/PubBG3.mp4`} type="video/mp4" />
          </video> */}
          <div className="agree-btn" onClick={() => this.addition("preAgree", "taking")}></div>
        </div>
        <div className="taking pages">
          <div className="filterTaking"></div>
          {/* <video loop autoPlay id="takingVdo" muted    className='wally-vdo'>
            <source src={`${vdo_url}/PubBG3.mp4`} type="video/mp4" />
          </video> */}
          <video className="wally-vdo" loop autoPlay id="previewTotalVdo" muted>
            <source src={`${vdo_url}/PubBG3.mp4`} type="video/mp4" />
          </video>
          <audio src={sound_src} autoPlay />
          <audio src={drop_let_src} autoPlay />
          <img src={`${img_url}/pub-logo.png`} alt="" className="pub" />

          <div className="flash">
            <span>
              Look at the camera <br></br>
              and smile!
            </span>
          </div>
          <img src={`${img_url}/withoutFilter.png`} alt="without filter" className="wt-filter" />
          {/* {!doneTake ? ( */}
          <Webcam ref={(r) => (this.camera = r)} videoConstraints={this.videoConstraints} audio={false} screenshotFormat="image/jpeg" screenshotQuality={1} id="camera" style={{ height: (720 * window.innerWidth) / 1080 }} />

          {doneTake ? <img src={merge_url1} alt="" className="previewFull firstMergePre" width={900} height={600} id="firstPreviewOne" /> : null}

          {!doneTake ? (
            <div className="spinners">
              <div className="spinner-block">
                <div className="spinner spinner-1"></div>
              </div>
            </div>
          ) : null}

          <div className="countDown" id="vdoCountH">
            {vdoCountDown}
          </div>

          <img id="twoCart" src={tCartoon} alt="" className="twinCartoon twoCart" />
          <img id="secFotune" src={tCartoonSec} alt="" className="twinCartoon sec-fortune" />
        </div>
        <div className="preview pages">
          <video className="wally-vdo" loop autoPlay id="previewTotalVdo" muted>
            <source src={`${vdo_url}/PubBG3.mp4`} type="video/mp4" />
          </video>
          <div className="filterTaking"></div>
          <img src={`${img_url}/pub-logo.png`} alt="" className="pub" />
          <img src={`${img_url}/water-logo.png`} alt="" className="waterLogo" />
          <div className="checkImgTxt">CHECK YOUR PHOTOS</div>
          <canvas ref="canvas" className="hidden" width={window.innerWidth} height={(720 * window.innerWidth) / 1080} />
        </div>
        <div className="preview2 pages">
          <div className="filterTaking"></div>
          <video className="wally-vdo" loop autoPlay id="previewTotalVdo" muted>
            <source src={`${vdo_url}/PubBG3.mp4`} type="video/mp4" />
          </video>
          <img src={`${img_url}/pub-logo.png`} alt="" className="pub" />
          <img src={`${img_url}/water-logo.png`} alt="" className="waterLogo" />
          <div className="checkImgTxt">CHECK YOUR PHOTOS</div>
          <canvas ref="canvas2" width={window.innerWidth} height={(720 * window.innerWidth) / 1080} className="hidden" />
          <div className="imgAttGp">
            <img src={merge_url1} id="firstMerge" alt="" className="previewMerge firstMerge" width={900} />
            <img
              src={merge_url2}
              id="lastMerge"
              alt=""
              className="previewMerge lastMerge"
              width={900}
              // height={900}
            />
            <img src={`${img_url}/right-arr.png`} alt="" className="nextCheck right-arr " onClick={this.previewRight} />
            <img src={`${img_url}/left-arr.png`} alt="" className="nextCheck prevCheck left-arr" onClick={this.previewLeft} />
            <div className="attLeft" style={{ top: previewAllH + 60 }}>
              {retakeCount} {retakeCount % 2 == 0 ? "ATTEMPTS" : "ATTEMPT"} LEFT
            </div>
            <div className="okRetakeGp" style={{ top: previewAllH + 120 }}>
              <img src={`${img_url}/ok-btn.png`} className="okBtn" alt="okbtn" onClick={() => this.confuseOk()} />
              {retakeCount != 0 ? <img src={`${img_url}/retake-btn.png`} alt="retake Btn" className="retakeBtn hell-retake" onClick={() => this.retakePhoto(checkingPic)} /> : <img src={`${img_url}/retakeGrey.png`} alt="retake Btn" className="retakeBtn hell-retake" />}
            </div>
          </div>
        </div>
        <div className="previewTotal pages">
          <div className="filterTaking"></div>
          <video className="wally-vdo" loop autoPlay id="previewTotalVdo" muted>
            <source src={`${vdo_url}/PubBG3.mp4`} type="video/mp4" />
          </video>

          <img src={`${img_url}/pub-logo.png`} alt="" className="pub" />
          <img src={`${img_url}/water-logo.png`} alt="" className="waterLogo" />
          <img src={headerPreLogo} id="topLogo" alt="" className="hidden" />
          <img src={footerPreLogo} id="footLogo" alt="" className="hidden" />
          <img src={`${img_url}/ss1.png`} id="ss1" alt="SSQ" className="hidden" />
          <img src={`${img_url}/ss2.png`} id="ss2" alt="SSQ" className="hidden" />

          <div className="checkImgTxt preview-check">PREVIEW</div>

          <div className="middlePreTot">
            <canvas ref="canvasPreviewTot" className="canvasPreviewTot hidden" width={totPreviewX} height={totPreviewY} />
            <img src={`${img_url}/mail-btn.png`} alt="retake Btn" className="retakeBtn email-btn" onClick={() => this.addition("previewTotal", "email")} />
          </div>
        </div>
        <div className="email pages">
          <div className="filterTaking"></div>
          {/* <video autoPlay loop id="emailVdo" muted             className='wally-vdo'
>
            <source src={`${vdo_url}/PubBG3.mp4`} type="video/mp4" />
          </video> */}
          <video className="wally-vdo" loop autoPlay id="previewTotalVdo" muted>
            <source src={`${vdo_url}/PubBG3.mp4`} type="video/mp4" />
          </video>
          <img src={`${img_url}/pub-logo.png`} alt="" className="pub" />
          <img src={`${img_url}/water-logo.png`} alt="" className="waterLogo" />
          <input type="email" className={`previewMail ${!authMail ? "notAuth" : ""}`} value={mail} placeholder="Enter your email address here" onChange={(e) => this.handleKey(e, true)} />
          {this.renderKeyboard()}
          <div className="okRetakeGp sendBackGp">
            <img src={`${img_url}/send-btn.png`} alt="Send BTB" onClick={authMail ? () => this.sendMail() : null} />
            <img src={`${img_url}/back-btn.png`} alt="Send BTB" onClick={() => this.mergeAll(true)} />
          </div>
        </div>
        <div className="thz pages">
          <div className="filterTaking"></div>
          {/* <video  loop autoPlay id="thzVdo" muted             className='wally-vdo'>
            <source src={`${vdo_url}/PubBG3.mp4`} type="video/mp4" />
          </video> */}
          <video className="wally-vdo" loop autoPlay id="previewTotalVdo" muted>
            <source src={`${vdo_url}/PubBG3.mp4`} type="video/mp4" />
          </video>
          <img src={`${img_url}/pub-logo.png`} alt="" className="pub" />
          <img src={`${img_url}/water-logo.png`} alt="" className="waterLogo" />
          <div id="finalTxt1" className="thanks-txt finalTxt">
            thank you!
          </div>
          <div className="willPromise">
            <span id="finalTxt2" className="finalTxt padRight">
              You will receive your
            </span>
            <span id="finalTxt3" className="finalTxt padRight">
              photos in a few moments.{" "}
            </span>
          </div>
          <div className="tagUs">
            <span className=" finalTxt padRight">Remember to share your pictures on</span>
            <span className="finalTxt lastLine padRight">social media and tag @pubsingapore! </span>
          </div>

          <img src={`${img_url}/backStart-btn.png`} onClick={() => this.addition("", "", "re")} className="backStart" alt="" />
        </div>
      </div>
    );
  }
}
const img_url = "https://assets.cc.ninetyfivegroup.com/images/WallySally";
const vdo_url = "https://assets.cc.ninetyfivegroup.com/videos/WallySally";

export default WallySally;
