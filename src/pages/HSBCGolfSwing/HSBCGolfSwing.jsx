import React, { Component } from "react";

import "./HSBCGolfSwing.css";
//img

//library
import Webcam from "react-webcam";
import { TweenLite, Bounce, TweenMax, TimelineLite, Elastic, } from "gsap";

class App extends Component {
  frame = 0;
  goingRight = true;
  ctx;
  requestID;
  webcamRef;
  progressRef;
  playingTimeOutControl;
  truck;
  truck2;
  truck3;
  audio;
  gameStatus = {
    waiting: "WAITING",
    teaching: "Teaching",
    playing: "PLAYING",
    shareContributor: "SHARECONTRIBUTOR",
    snap: "SNAP",
    finalShare: "FinalShare",
    end: "END"
  };
  state = {
    gameStatus: this.gameStatus.waiting,
    score: 0,
    meals: 0,
    brightLevel: 100,
    screenShot: null,
    progressHeight: 50
  };
  videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };
  componentDidMount() {
    if (this.state.gameStatus == this.gameStatus.playing) {
      this.loopCanvas();
    }
  
    this.audio = new Audio(song_url);
    this.audio.play();
    this.audio.loop = true;
  }
  playBG = () => {};
  drawCanvas = () => {
    const img = this.refs.point;
    //  console.log(this.frame);
    this.ctx.drawImage(img, this.frame, 2, 16, 16);
  };
  updateCanvas = () => {
    const width = this.ctx.canvas.width;
    if (this.frame < width && this.goingRight) {
      this.frame += 2;
      if (this.frame >= width - 15) {
        this.goingRight = false;
      }
    } else {
      this.frame -= 2;
      if (this.frame === 0) {
        this.goingRight = true;
      }
    }
  };
  loopCanvas = () => {
    if(this.refs.redLightCanvas == null) {
      return
    }
    this.ctx = this.refs.redLightCanvas.getContext("2d");
    this.ctx.clearRect(0, 0, 500, 30);

    this.drawCanvas();
    this.updateCanvas();

    this.requestID = requestAnimationFrame(this.loopCanvas);
  };
  scoreCalculated = () => {
    window.cancelAnimationFrame(this.requestID);
    let heightestScore = (this.ctx.canvas.width + 1) / 2;
    let returnScore = this.frame;
    if (returnScore > heightestScore) {
      let exceedScore = this.frame % heightestScore;
      returnScore = heightestScore - exceedScore;
    }
    this.setState({ score: returnScore + 100 });
  };

  golfFlyingAnim = () => {
    var truck1 = this.truck;
    var truck2 = this.truck2;
    var truck3 = this.truck3;

    const label = this.refs.label;
    const leftMeasure = this.refs.leftMeasure;
    const rightMeasure = this.refs.rightMeasure;

    const golfBall = this.refs.golf;
    const playGroundBg = this.refs.playGroundBGpic;
    var tl = new TimelineLite({ delay: 0.1 });
    TweenLite.to(playGroundBg, 2, { webkitFilter: "blur(2px)" });
    let ballFall = window.innerHeight/2 

     let truckY = window.innerHeight- truck1.height
    if (this.state.score >= 200) {
      //ball
      tl.to(golfBall, 0.4, { rotation: 1800, ease: Elastic.easeOut })
        .to(golfBall, 3.0, {
          y: -ballFall,
          scale: 0.4
        })
        .to(golfBall, 1.8, { scale: 0.3, rotation: 180 }, "-=1.0")
        .to(
          golfBall,
          0.8,
          { top: `100%`, scale: 0.2, ease: Bounce.easeOut, rotation: 310,position:'absolute' },
          "-=0.3"
        );
      //truck
       TweenLite.to(truck1, 2, {
        scale: 3,
        y: truckY ,
        delay: 0.6,
      });
      TweenLite.to(truck2, 2, {
        scale: 3,
        delay: 2,
        display:'none',
        y: truckY,
      });
      TweenLite.to(truck3, 2, {
        scale: 1,
        delay: 3,
        onComplete: this.animComplete
      });
      setTimeout(() => {
        truck1.style.display ='none'
      }, 1200);

      setTimeout(() => {
        truck2.style.display ='none'
      }, 3800);
      
      const label = this.refs.label;
      const leftMeasure = this.refs.leftMeasure;
      const rightMeasure = this.refs.rightMeasure;

      setTimeout(() => {
        leftMeasure.style.display = "block";
        rightMeasure.style.display = "block";
        label.style.display = "block";
      }, 4000);

    } else if (this.state.score >= 150) {
      //ball
      tl.to(golfBall, 0.4, { rotation: 1800, ease: Elastic.easeOut })
        .to(golfBall, 1.0, {
          y: -ballFall,
          scale: 0.4
        })
        .to(golfBall, 1.8, { scale: 0.3, rotation: 180 }, "-=1.0")
        .to(
          golfBall,
          0.8,
          { top: `100%`, scale: 0.2, ease: Bounce.easeOut, rotation: 310,position:'absolute'  },
          "-=0.3"
        );
      //truck
      TweenLite.to(truck1, 2, {
        scale: 3,
        y: truckY,
        delay: 0.6
      });
      TweenLite.to(truck2, 2, {
        scale: 1,
        delay: 1,
        onComplete: this.animComplete
      });
      setTimeout(() => {
        truck1.style.display = "none";
      }, 1700);
      this.setState({ score: this.state.score - 100 }, () => {
        setTimeout(() => {
          leftMeasure.style.display = "block";
          rightMeasure.style.display = "block";
          label.style.display = "block";
        }, 2000);
      });
    } else {
      tl.to(golfBall, 0.4, { rotation: 1800, ease: Elastic.easeOut })
        .to(golfBall, 1.0, {
          y: -ballFall,
          scale: 0.4
        })
        .to(golfBall, 1.8, { scale: 0.3, rotation: 180 }, "-=1.0")
        .to(
          golfBall,
          0.8,
          {
             top: `100%`,
            scale: 0.2,
            ease: Bounce.easeOut,
            rotation: 310,
            position:'absolute',
            onComplete: this.animComplete

          },
          "-=0.3"
        );
      this.setState({ score: this.state.score - 100 }, () => {
        setTimeout(() => {
          leftMeasure.style.display = "block";
          rightMeasure.style.display = "block";
          label.style.display = "block";
        }, 1500);
      });
    }
  };
  animComplete = () => {
    console.log(this.state.score);
    if (this.state.score < 50) {
      setTimeout(() => {
        this.setState({
          gameStatus: this.gameStatus.shareContributor,
          meals: 1
        });
      }, 5000);
    } else if (this.state.score < 100) {
      setTimeout(() => {
        this.setState({
          gameStatus: this.gameStatus.shareContributor,
          meals: 2
        });
      }, 5000);
    } else {
      setTimeout(() => {
        this.setState({
          gameStatus: this.gameStatus.shareContributor,
          meals: 3
        });
      }, 5000);
    }
  };
  tapClick = () => {
    const tabRef = this.refs.tapClick;
    this.truck2 = this.refs.truck2;
    this.truck3 = this.refs.truck3;
    this.truck = this.refs.truck;
    tabRef.style.display = "none";
    this.truck.style.display = "block";
    //calculate out the score
    this.scoreCalculated();
    //do animation on golf ball
    setTimeout(() => {
      this.golfFlyingAnim();
    }, 500);
  };
  
  toCameraCatch = () => {
    this.setState({
      gameStatus: this.gameStatus.snap
    });
  };
  toFinalShare = () => {
    this.setState(
      {
        gameStatus: this.gameStatus.finalShare
      },
      () => {
        this.brightness();
      }
    );
  };
  capture = () => {
    if (!this.state.screenShot) {
      const imageSrc = this.webcamRef.getScreenshot();
      this.setState({ screenShot: imageSrc });
      this.toFinalShare();
    }
  };
  incrementLight = () => {
    if (this.state.progressHeight < 100) {
      this.setState(
        {
          brightLevel: this.state.brightLevel + 10,
          progressHeight: this.state.progressHeight + 10
        },
        () => {
          this.brightness();
        }
      );
    }
  };
  decrementLight = () => {
    if (this.state.progressHeight >= 0) {
      this.setState(
        {
          brightLevel: this.state.brightLevel - 10,
          progressHeight: this.state.progressHeight - 10
        },
        () => {
          this.brightness();
        }
      );
    }
  };
  storeDB = () => {
    this.setState({
      gameStatus: this.gameStatus.end
    });
  };
  joinUs = () => {
    const joinUsTxt = this.refs.joinUs;
    const firstRef = this.refs.firstPageRef1;
    const secondRef = this.refs.firstPageRef2;
    const thirdRef = this.refs.firstPageRef3;

    joinUsTxt.style.display = "block";
    firstRef.style.display = "none";
    secondRef.style.display = "none";
    thirdRef.style.display = "none";
    this.playBG();
    setTimeout(() => {
      this.setState({
        gameStatus: this.gameStatus.teaching
      });
    }, 5000);
    this.playingTimeOutControl = setTimeout(() => {
      this.setState({ gameStatus: this.gameStatus.playing }, () => {
        this.loopCanvas();
      });
    }, 15000);
  };

  brightness = () => {
    this.progressRef = this.refs.bar;
    const refAdjustPic = this.refs.adjustingImg;
    refAdjustPic.style.filter = `brightness(${this.state.brightLevel}%)`;
    this.progressRef.style.height = this.state.progressHeight + "%";
  };

  beginAll = () => {
    this.setState({ gameStatus: this.gameStatus.waiting, screenShot: null });
  };
  render() {
    const { gameStatus, score, screenShot, meals } = this.state;
    switch (gameStatus) {
      case this.gameStatus.waiting:
        return (
          <div className="mainBg snapShot">
            <div className="makeCenter">
              <div className="joinUs hide" ref="joinUs">
                Join Us and <br />
                the willing hearts <br /> charity in <br /> providing meals{" "}
                <br /> to those in need
              </div>
              <div>
                <img
                  src={`${image_url}/driveForSG.png`}
                  alt=""
                  className="drive"
                  ref="firstPageRef1"
                />
              </div>
              <div className="middleGuy">
                <img
                  src={`${image_url}/playGolfBtn.png`}
                  alt=""
                  className="btnPlayGolf"
                  onClick={this.joinUs}
                  ref="firstPageRef2"
                />
              </div>
              <div>
                <img
                  src={`${image_url}/hwwLogo.png`}
                  alt=""
                  className="logo"
                  ref="firstPageRef3"
                />
              </div>
            </div>
          </div>
        );
      case this.gameStatus.teaching:
        return (
          <div className="snapShot roadBg">
            <div className="makeCenter roadRoad">
              <img
                src={`${image_url}/howToPlayTxt.png`}
                alt=""
                className="howToPlay"
              />
              <img
                src={`${image_url}/startPlayingBtn.png`}
                className="startPlay"
                alt=""
                onClick={() => {
                  setTimeout(() => {
                    this.setState({ gameStatus: this.gameStatus.playing });
                    clearTimeout(this.playingTimeOutControl);
                    this.loopCanvas();
                  }, 500);
                }}
              />
            </div>
          </div>
        );
      case this.gameStatus.playing:
        return (
          <div className="golfPlayingBG">
           
            <img
              src={`${image_url}/bg.png`}
              alt=""
              className="playGroundBGpic"
              ref="playGroundBGpic"
            />
            <img
              ref="leftMeasure"
              alt="leftMeasure"
              src={`${image_url}/measureLeft.png`}
              className="leftMeasure"
            />
            <img
              ref="rightMeasure"
              alt="rightMeasure"
              src={`${image_url}/measureRight.png`}
              className="rightMeasure"
            />
            <img
              ref="truck3"
              alt=""
              className="truck3 "
              src={`${image_url}/truck.png`}
            />
            <img
              ref="truck2"
              alt=""
              className="truck2 "
              src={`${image_url}/truck.png`}
            />
            <img
              ref="truck"
              alt=""
              className="truck hide"
              src={`${image_url}/truck.png`}
            />
            <img
              ref="tapClick"
              src={`${image_url}/tap.png`}
              className="tap"
              alt="tap"
              onClick={this.tapClick}
            />{" "}
            <div className="golf-tee">
              <img src={`${image_url}/Tee.png`} className="tee" alt="tee" />{" "}
              <img
                ref="golf"
                src={`${image_url}/ball.png`}
                className="golf-ball"
                id="golf-ball"
                alt="ball"
              />
            </div>
            <img
              ref="point"
              src={`${image_url}/point.png`}
              className="hide"
              alt="point"
            />
            <div className="label" ref="label">
              {" "}
              {score}m
            </div>
            <canvas ref="redLightCanvas" id="redLightCanvas"  height={50} />
          </div>
        );
      case this.gameStatus.shareContributor:
        return (
          <div className="shareContributor mainBg">
            <div className="makeCenter">
              <div className="thanks">Thank You!</div>
              <div className="des">
                Your drive made the ball <br></br> travel {score} meters,
                <br /> resulting in {meals} meals delivered.
              </div>
              <div className="button" onClick={this.toCameraCatch}>
                <img
                  src={`${image_url}/shareContriBtm.png`}
                  alt="share Contributor Button"
                  className="shareContriBtm"
                />
              </div>
            </div>
          </div>
        );
      case this.gameStatus.snap:
        return (
          <div className="snapShot mainBg">
            <div className="makeCircle">
              {screenShot ? (
                <img src={screenShot} alt="" className="frame" />
              ) : (
                <Webcam
                  audio={true}
                  ref={node => (this.webcamRef = node)}
                  screenshotFormat="image/jpeg"
                  videoConstraints={this.videoConstraints}
                  className="frame"
                />
              )}

              <img
                src={`${image_url}/cameraIcon.png`}
                alt=""
                className="cameraIcon"
                onClick={this.capture}
              />
              <img
                src={`${image_url}/snapShot.png`}
                alt=""
                className="snapShotTake"
                onClick={this.capture}
              />
            </div>
          </div>
        );
      case this.gameStatus.finalShare:
        return (
          <div className="snapShot mainBg">
            <div className="adjustBrightness">
              <div className="goCenter">
                <button className="moreLight" onClick={this.incrementLight}>
                  +
                </button>
                <div className="bar">
                  <div className="choseBar" ref="bar"></div>
                </div>
                <button className="leastLight" onClick={this.decrementLight}>
                  -
                </button>
              </div>
            </div>
            <div className="makeCircle snapShotFinalShare">
              <img
                src={screenShot}
                alt=""
                className="frame"
                ref="adjustingImg"
              />
              <div className="donateLabel">
                I've donated <br />{" "}
                <span className="redTxt">{meals} meals </span> by driving <br />{" "}
                a golf ball
              </div>
              <div className="snapShotBtn">
                <div className="retake"></div>
                <div className="share">
                  <img
                    src={`${image_url}/finalShareBtn.png`}
                    alt=""
                    className="snapShotTake"
                    onClick={this.storeDB}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="snapShot mainBg">
            <div className="makeCircle finalEnd">
              <img src={`${image_url}/thanks.png`} alt="" className="thz" />
              <img
                src={`${image_url}/hwwLogo.png`}
                alt=""
                className="hwwLogo"
              />
              <button className="goBackHome" onClick={this.beginAll}>
                Go Back
              </button>
            </div>
          </div>
        );
    }
  }
}

const image_url = "https://assets.cc.ninetyfivegroup.com/images/hsbc-golf/";
const song_url = "https://assets.cc.ninetyfivegroup.com/songs/hsbc-golf/bg.mp3";
export default App;
