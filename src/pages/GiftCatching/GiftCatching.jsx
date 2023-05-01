import React from "react";
import "./GiftCatching.css";
// import { thisExpression } from "@babel/types";
class GiftCatching extends React.Component {
  ctx;
  animationFrameRef;
  animateClaw;
  gameCounting = 0;
  idleGameStart;
  idleGameOver;
  idleGamePending;
  pendingCounter = 0;
  starterFrame = new Image();
  frames = 0;
  imgFrames = 0;
  sockFrame = 0;
  clawLeftFrame = 15;
  clawRightFrame = -15;
  rotatingFrame = 0;
  //elves animation Frame
  elvesFrame = 0;
  //gifts
  gift1 = new Image();
  gift2 = new Image();
  gift3 = new Image();
  gift4 = new Image();
  gift5 = new Image();
  gift6 = new Image();
  gift7 = new Image();
  gift8 = new Image();
  gift9 = new Image();
  //elvis
  elvesLower = new Image();
  elvesUp = new Image();
  //conveyer
  conveyLower = new Image();
  conveyUp = new Image();
  conveyConver = new Image();
  //machine
  machineImg = new Image();
  //controller
  controller = new Image();
  //claws
  clawBody = new Image();
  clawHeadCenter = new Image();
  clawHeadLeft = new Image();
  clawHeadRight = new Image();
  //sticks
  stick = new Image();
  //String
  String = new Image();
  //socks
  redSock = new Image();
  greenSock = new Image();
  //bells
  blueBall = new Image();
  orangeBall = new Image();
  greenBall = new Image();
  //santa
  satan = new Image();
  //three
  christMax = new Image();
  //wood
  beam = new Image();
  DEGREE = Math.PI / 180;
  state = {
    current: 0,
    pending: 0,
    gameStart: 1,
    gameEnd: 2,
    goingDown: false,
    reach60: false,
    controllerGlow: true,
    txtGlow: true,
    clickable: true,
    finalV2Show: false
  };
  ImageArr = [
    this.gift1,
    this.gift2,
    this.gift3,
    this.gift4,
    this.gift5,
    this.gift6,
    this.gift7,
    this.gift8,
    this.gift9
  ];
  ImageConfig = () => {
    this.conveyConver.src = `${image_url}CoverUp.png`;
    this.String.src = `${image_url}BearString.png`;
    this.satan.src = `${image_url}satan.png`;
    this.starterFrame.src = `${image_url}gameBg.png`;
    this.blueBall.src = `${image_url}blueBall.png`;
    this.orangeBall.src = `${image_url}orangeBall.png`;
    this.greenBall.src = `${image_url}greenBall.png`;
    this.redSock.src = `${image_url}Redsock.png`;
    this.greenSock.src = `${image_url}Greensock.png`;
    this.conveyUp.src = `${image_url}upperConveyer.png`;
    this.conveyLower.src = `${image_url}lowerConveyer.png`;
    this.stick.src = `${image_url}stick.png`;
    this.machineImg.src = `${image_url}Machine.png`;
    this.controller.src = `${image_url}MachineControlUnglow.png`;
    this.clawBody.src = `${image_url}clawBody.png`;
    this.clawHeadCenter.src = `${image_url}clawHeadCenter.png`;
    this.clawHeadRight.src = `${image_url}clawHeadRight.png`;
    this.clawHeadLeft.src = `${image_url}clawHeadLeft.png`;
    this.gift1.src = `${image_url}gift1.png`;
    this.gift2.src = `${image_url}gift2.png`;
    this.gift3.src = `${image_url}gift3.png`;
    this.gift4.src = `${image_url}gift4.png`;
    this.gift5.src = `${image_url}gift5.png`;
    this.gift6.src = `${image_url}gift6.png`;
    this.gift7.src = `${image_url}gift7.png`;
    this.gift8.src = `${image_url}gift8.png`;
    this.gift9.src = `${image_url}gift9.png`;
    this.beam.src = `${image_url}beam.png`;
    this.elvesLower.src = `${image_url}elvesLower.png`;
    this.elvesUp.src = `${image_url}elvesUp.png`;
    this.elvesLower.src = `${image_url}elvesLower.png`;
    this.christMax.src = `${image_url}christmasTree.png`;
  };
  Satan = {
    x: 50,
    y: 1400,
    dx: 3,
    success: false,
    draw: () => {
      // this.satan.onload = () => {
      this.ctx.drawImage(this.satan, this.Satan.x, this.Satan.y);
      //   };
    },
    leaveUpdate: () => {
      if (this.gifts.success && this.Satan.x <= 1080) {
        this.Satan.x += this.Satan.dx;
        this.gifts.position.filter(gift => {
          if (gift.caught) {
            gift.x += this.Satan.dx;
          }
        });
      }
      if (this.Satan.x >= 1080) {
        this.Satan.success = true;
      }
    }
  };
  bg = {
    w: 1080,
    h: 1920,
    draw: () => {
      //  this.starterFrame.onload = () => {
      this.ctx.drawImage(this.starterFrame, 0, 0, this.bg.w, this.bg.h);
      //   };
    }
  };
  //first sock => {320, 363} {435, 387} {550, 387} {665, 363}
  socks = {
    x: 320,
    y: 342,
    limit: 60,
    drawString: () => {
      this.ctx.save();

      this.ctx.translate(0, 0);
      this.ctx.drawImage(this.String, this.socks.x, this.socks.y);
      this.ctx.restore();
    },
    drawUpdateBell: () => {
      // this.ctx.clearRect(0, 0, 1080, 1920);

      this.ctx.save();
      // this.draw();

      this.ctx.translate(377.5 + this.greenSock.width / 2, 373);
      this.ctx.rotate(this.DEGREE * this.sockFrame);
      this.ctx.drawImage(this.blueBall, -this.blueBall.width / 2 - 3, -10);
      this.ctx.restore();
      this.ctx.save();
      this.ctx.translate(492.5 + this.redSock.width / 2, 387);
      this.ctx.rotate(this.DEGREE * this.sockFrame);
      this.ctx.drawImage(this.orangeBall, -this.orangeBall.width / 2 - 3, -10);
      this.ctx.restore();
      this.ctx.save();
      this.ctx.translate(607.5 + this.redSock.width / 2, 373);
      this.ctx.rotate(this.DEGREE * this.sockFrame);
      this.ctx.drawImage(this.orangeBall, -this.greenBall.width / 2 - 3, -10);
      this.ctx.restore();
    },
    drawUpdateSocks: () => {
      // this.ctx.clearRect(0, 0, 1080, 1920);
      // this.draw();
      this.ctx.save();
      this.ctx.translate(320 + this.greenSock.width / 2 - 9, 363);
      this.ctx.rotate(this.DEGREE * this.sockFrame);
      this.ctx.drawImage(this.greenSock, -this.greenSock.width / 2 + 8, -15);
      this.ctx.restore();

      this.ctx.save();
      this.ctx.translate(435 + this.redSock.width / 2, 387);
      this.ctx.rotate(this.DEGREE * this.sockFrame);
      this.ctx.drawImage(this.redSock, -this.redSock.width / 2, -15);
      this.ctx.restore();

      this.ctx.save();
      this.ctx.translate(550 + this.greenSock.width / 2, 387);
      this.ctx.rotate(this.DEGREE * this.sockFrame);
      this.ctx.drawImage(this.greenSock, -this.greenSock.width / 2, -15);
      this.ctx.restore();

      this.ctx.save();
      this.ctx.translate(665 + this.redSock.width / 2, 368);
      this.ctx.rotate(this.DEGREE * this.sockFrame);
      this.ctx.drawImage(this.redSock, -this.redSock.width / 2, -15);
      this.ctx.restore();
    }
  };
  conveyer = {
    upperY: 796,
    upperX: 0,
    lowerY: 1151,
    lowerX: 0,
    degree: Math.PI / 180,
    stickX: 47,
    stickY: 816,
    sticks: [],
    drawCoverUp: () => {
      this.ctx.drawImage(this.conveyConver, 116, 796);
    },
    draw: () => {
      //  this.conveyLower.onload = () => {
      this.ctx.drawImage(this.conveyLower, this.conveyer.lowerX, 725);
      //   };

      //   this.conveyUp.onload = () => {
      this.ctx.drawImage(this.conveyUp, this.conveyer.upperX, 664);
      //  };
    },
    drawRightArc: () => {
      this.ctx.beginPath();
      this.ctx.moveTo(50, 795);
      this.ctx.lineTo(120, 795);
      this.ctx.arc(
        130,
        816.5,
        22,
        this.conveyer.degree * 90,
        this.conveyer.degree * 270
      );
      this.ctx.moveTo(150, 838);
      this.ctx.lineTo(50, 839);
      this.ctx.fillStyle = "#E8D2A8";
      this.ctx.fill();
    },
    drawLeftArc: () => {
      this.ctx.beginPath();
      this.ctx.moveTo(70, 795);

      this.ctx.arc(
        70,
        816.5,
        22,
        this.conveyer.degree * 90,
        this.conveyer.degree * 270
      );
      // this.ctx.moveTo(150, 838);
      // this.ctx.lineTo(50, 839);
      this.ctx.fillStyle = "#D7BB73";
      this.ctx.fill();
    }, //begin {58, 835}, end{58, 795}
    drawRect: () => {
      this.ctx.beginPath();
      this.ctx.moveTo(70, 795);
      this.ctx.lineTo(120, 795);
      this.ctx.lineTo(120, 839);
      this.ctx.lineTo(70, 839);
      this.ctx.fillStyle = "#D7BB73";
      this.ctx.fill();
    },
    drawStick: () => {
      for (let index = 0; index < this.conveyer.sticks.length; index++) {
        let stick = this.conveyer.sticks[index];
        this.ctx.drawImage(this.stick, stick.x, stick.y);
      }
    },
    updateRect: () => {
      if (
        this.rotatingFrame % 50 === 0 &&
        this.claw.clawBodyY +
          this.claw.clawHeadHeight -
          35 +
          this.claw.height !==
          700
      ) {
        this.rotatingFrame = 0;
        this.conveyer.sticks.push({
          x: 58,
          y: 835,
          reachHalf: false
        });
      }
      for (let index = 0; index < this.conveyer.sticks.length; index++) {
        let stick = this.conveyer.sticks[index];
        if (stick.y >= 795) {
          stick.y -= 0.3;
          if (stick.x >= 47 && stick.y >= 805 && !stick.reachHalf) {
            stick.x -= 0.2;
          } else {
            stick.reachHalf = true;
            stick.x += 0.1;
          }
        } else {
          this.conveyer.sticks.shift();
        }
      }
    }
  };
  machine = {
    draw: () => {
      this.ctx.drawImage(this.machineImg, 1080 - this.machineImg.width, 675);
    }
  };
  claw = {
    clawBodyY: 410,
    clawBodyX: 250,
    height: 0,
    dx: 4,
    hasGift: false,
    clawHeadWidth: 100,
    clawHeadHeight: 73,
    limit: 700,
    draw: () => {
      this.ctx.drawImage(
        this.clawBody,
        this.claw.clawBodyX,
        this.claw.clawBodyY,
        this.clawBody.width,
        this.claw.height + this.clawBody.height
      );
      // this.ctx.drawImage(
      //   this.clawHeadLeft,
      //   this.claw.clawBodyX - 28,
      //   this.claw.clawBodyY + this.claw.clawHeadHeight - 32 + this.claw.height
      // );
      this.claw.drawLeftClaw();
      this.ctx.drawImage(
        this.clawHeadCenter,
        this.claw.clawBodyX - 5,
        this.claw.clawBodyY + this.claw.clawHeadHeight - 35 + this.claw.height
      );
      this.claw.drawClawRight();
    },
    increaseClaw: () => {
      if (
        this.claw.clawBodyY +
          this.claw.clawHeadHeight -
          35 +
          this.claw.height >=
        this.claw.limit
      ) {
        if (this.clawLeftFrame > 10) {
          this.clawLeftFrame = this.clawLeftFrame - 1;
        }
        if (this.clawRightFrame < -10) {
          this.clawRightFrame = this.clawRightFrame + 1;
        }

        if (this.clawLeftFrame === 10 && this.claw.hasGift) {
          this.claw.limit = 1460;
        } else if (this.clawLeftFrame === 10) {
          this.playerClawArmBody.pause();
          this.helperDecrease();
        }
      } else {
        this.setState({
          controllerGlow: false,
          clickable: false,
          txtGlow: false
        });
        this.claw.height += this.claw.dx;
        if (
          this.claw.clawBodyY +
            this.claw.clawHeadHeight -
            35 +
            this.claw.height ===
          1460
        ) {
          this.claw.hasGift = false;
        }
      }
    },
    drawLeftClaw: () => {
      this.ctx.save();
      this.ctx.translate(
        this.claw.clawBodyX - 32 + this.clawHeadLeft.width,
        this.claw.clawBodyY + this.claw.clawHeadHeight - 28 + this.claw.height
      );
      this.ctx.rotate(this.DEGREE * this.clawLeftFrame);

      this.ctx.drawImage(this.clawHeadLeft, -this.clawHeadLeft.width, 0);

      this.ctx.restore();
    },
    drawClawRight: () => {
      this.ctx.save();
      this.ctx.translate(
        this.claw.clawBodyX + 20,
        this.claw.clawBodyY + this.claw.clawHeadHeight - 29 + this.claw.height
      );
      this.ctx.rotate(this.DEGREE * this.clawRightFrame);
      this.ctx.drawImage(this.clawHeadRight, 0, 0);

      this.ctx.restore();
    }
  };
  gifts = {
    imgArr: this.ImageArr.slice(0),
    position: [],
    x: 100,
    upperY: 796,
    lowerY: 1151,
    limit: 722,
    dx: 2,
    success: false,
    imgExporting: 8,
    draw: () => {
      //   this.ctx.drawImage(this.gift1, 210, 1050);
      for (let index = 0; index < this.gifts.position.length; index++) {
        const img = this.gifts.position[index].img;
        if (img !== "Space" && img) {
          this.ctx.drawImage(
            img,
            this.gifts.position[index].x,
            this.gifts.position[index].y - img.height
          );
        }
      }
    },
    update: () => {
      if (
        this.frames % 100 === 0 &&
        this.claw.clawBodyY +
          this.claw.clawHeadHeight -
          35 +
          this.claw.height !==
          700
      ) {
        this.frames = 0;
        if (this.gifts.imgArr[this.imgFrames] !== "Space") {
          this.gifts.position.push({
            x: 100,
            y: this.gifts.upperY,
            img: this.gifts.imgArr[this.imgFrames],
            caught: false
          });
        }
        this.imgFrames = (this.imgFrames + 1) % this.gifts.imgArr.length;
      }

      this.gifts.catchingGift();
      if (this.state.current === this.state.gameStart) {
        this.gifts.sendingGift();
      }
    },
    catchingGift: () => {
      for (let index = 0; index < this.gifts.position.length; index++) {
        const img = this.gifts.position[index].img;
        let position = this.gifts.position[index];
        if (img !== "Space" && !position.caught && img) {
          const dx = this.gifts.dx;
          //collison
          const clawHeadWithHeight =
            this.claw.clawBodyY +
            this.claw.clawHeadHeight -
            35 +
            this.claw.height;
          //position.x = 192, ->  190 < catchArea (img.width) < 220 + img.width

          const upperCondition =
            position.x + img.width < 220 + img.width &&
            position.x > 190 &&
            !this.claw.hasGift &&
            clawHeadWithHeight > 650 &&
            clawHeadWithHeight < 700 &&
            position.y <= 796;
          const lowerCondition =
            position.x + img.width < 220 + img.width &&
            position.x > 190 &&
            !this.claw.hasGift &&
            clawHeadWithHeight > 1000 &&
            clawHeadWithHeight < 1060 &&
            position.y >= 1151;

          if (upperCondition || lowerCondition) {
            position.caught = true;
            this.playerClick.play();
            this.claw.hasGift = true;
            for (let imgage in this.gifts.imgArr) {
              if (this.gifts.imgArr[imgage] === img) {
                this.gifts.imgArr[imgage] = "Space";
              }
            }
            //need convert hasGift
          } else if (
            this.claw.clawBodyY +
              this.claw.clawHeadHeight -
              35 +
              this.claw.height !==
            700
          ) {
            if (position.y === this.gifts.upperY) {
              if (position.x > this.gifts.limit + img.width) {
                position.y = this.gifts.lowerY;
              } else {
                position.x += dx;
              }
            } else {
              if (position.x + img.width < 0) {
                this.gifts.position.shift();
              } else {
                position.x -= dx;
              }
            }
          }
        }
      }
    },
    sendingGift: () => {
      this.gifts.position.filter(position => {
        if (position.caught && this.claw.limit === 1460) {
          if (position.y < 1585) {
            this.conveyer.draw();
            this.conveyer.drawCoverUp();
            this.gifts.draw();
            if (this.elvesFrame > 30) {
              this.elvis.rotateElvesUp();
            } else {
              this.elvis.draw();
            }

            this.claw.draw();

            this.machine.draw();
            //   this.machine.controllerDraw();
            this.conveyer.drawLeftArc();
            this.conveyer.drawRect();
            this.conveyer.drawStick();
            this.conveyer.drawRightArc();

            this.Satan.draw();
            position.x = 213;
            position.y += 4;
          }
        }
        if (position.y >= 1580) {
          this.gifts.success = true;
        }
        if (this.Satan.success && this.claw.height <= 0) {
          this.gameEnd();
        }
      });
    }
  };

  wood = {
    x: 100,
    y: 348,
    draw: () => {
      this.ctx.drawImage(this.beam, this.wood.x, this.wood.y);
    }
  };
  elvis = {
    x: 220,
    upperY: 793,
    lowerY: 1148,
    draw: () => {
      this.ctx.drawImage(
        this.elvesUp,
        this.elvis.x - this.elvesLower.width + 30,
        this.elvis.upperY - this.elvesUp.height + 10
      );
    },
    drawLowerElvis: () => {
      this.ctx.drawImage(
        this.elvesLower,
        this.elvis.x + 300,
        this.elvis.lowerY - this.elvesLower.height + 10
      );
    },
    rotateElvesUp: () => {
      this.ctx.save();
      this.ctx.translate(
        this.elvis.x + 30,
        this.elvis.upperY - this.elvesUp.height + 10
      );
      this.ctx.scale(-1, 1);

      this.ctx.drawImage(
        this.elvesUp,
        0,
        0,
        this.elvesUp.width,
        this.elvesUp.height
      );
      this.ctx.restore();
    },
    rotateElvesDown: () => {
      this.ctx.save();
      this.ctx.translate(
        this.elvis.x + 300 + this.elvesLower.width,
        this.elvis.lowerY - this.elvesLower.height + 10
      );

      this.ctx.scale(-1, 1);
      this.ctx.drawImage(
        this.elvesLower,
        0,
        0,
        this.elvesLower.width,
        this.elvesLower.height
      );
      this.ctx.restore();
    }
  };
  christMaxTree = {
    x: 1080,
    y: 1250,
    draw: () => {
      //  this.christMax.onload = () => {
      this.ctx.drawImage(
        this.christMax,
        1080 - this.christMax.width,
        this.christMaxTree.y
      );
      //  };
    }
  };
  draw = () => {
    this.bg.draw();
    if (this.elvesFrame > 30) {
      this.elvis.rotateElvesDown();
      this.gifts.draw();
      this.elvis.rotateElvesUp();
      this.elvesFrame %= 60;
    } else {
      this.elvis.drawLowerElvis();

      this.gifts.draw();
      this.elvis.draw();
    }
    this.conveyer.draw();
    this.conveyer.drawLeftArc();
    this.conveyer.drawRect();
    this.conveyer.drawStick();
    this.conveyer.drawRightArc();
    this.conveyer.drawCoverUp();

    if (this.state.current !== this.state.pending) {
      this.wood.draw();
      this.claw.draw();
      this.socks.drawString();
    }
    this.machine.draw();
    //   this.machine.controllerDraw();

    this.christMaxTree.draw();
    this.Satan.draw();
  };
  updateSocks = () => {
    this.socks.drawUpdateBell();
    this.socks.drawUpdateSocks();
  };
  update = () => {
    this.gifts.update();
    this.conveyer.updateRect();
    this.Satan.leaveUpdate();
    if (this.state.current !== this.state.pending) {
      this.updateSocks();
    }
  };
  updateCanvas = () => {
    if(this.refs == null || this.refs.canvas == null) {
      return
    }
    this.ctx = this.refs.canvas.getContext("2d");
    this.draw();

    this.update();
    if (this.state.reach60) {
      this.sockFrame--;
      if (this.sockFrame === -20) {
        this.setState({ reach60: false });
      }
    } else {
      this.sockFrame++;
      if (this.sockFrame === 60) {
        this.setState({ reach60: true });
      }
    }

    if (
      this.claw.clawBodyY + this.claw.clawHeadHeight - 35 + this.claw.height !==
      700
    ) {
      this.rotatingFrame++;
      this.frames++;
    }

    this.elvesFrame++;
    if (this.state.current === this.state.gameStart) {
      this.animationFrameRef = requestAnimationFrame(this.updateCanvas);
    }
  };
  checkIdle = () => {
    switch (this.state.current) {
      case this.state.gameStart:
        this.idleGameStart = setInterval(() => {
          if (this.state.controllerGlow) {
            this.gameCounting++;
          } else {
            this.gameCounting = 0;
          }

          if (this.gameCounting >= 30) {
            this.gameRestart();
          }
        }, 1000);

        break;
      case this.state.gameEnd:
        this.gameCounting = 0;
        this.idleGameOver = setInterval(() => {
          this.gameCounting++;
          if (this.gameCounting >= 30) {
            this.gameRestart();
          }
        }, 1000);

        break;
      default:
        this.gameCounting = 0;
        break;
    }
  };
  helperDecrease = () => {
    cancelAnimationFrame(this.animateClaw);
    if (!this.state.txtGlow) {
      setTimeout(() => {
        this.playerClawArmBody.play();
      }, 100);
    }

    if (this.clawLeftFrame < 15) {
      this.clawLeftFrame = this.clawLeftFrame + 1;
    }
    if (this.clawRightFrame > -15) {
      this.clawRightFrame = this.clawRightFrame - 1;
    }
    if (this.claw.height >= 0 && this.clawLeftFrame === 15) {
      this.claw.height -= this.claw.dx;
      this.claw.hasGift = true;
      this.setState({ clickable: false });
    } else {
      this.claw.hasGift = false;
      this.setState({ controllerGlow: true, clickable: true });
    }
    if (this.claw.height === 0) {
      this.playerClawArmBody.pause();
    }
    this.setState({ txtGlow: true });
    this.animateClaw = requestAnimationFrame(this.helperDecrease);
  };
  increaseHelper = () => {
    this.claw.increaseClaw();
    this.animateClaw = requestAnimationFrame(this.increaseHelper);
  };
  handleClick = () => {
    if (this.state.clickable && !this.gifts.success) {
      this.playerClawArmBody.play();
      cancelAnimationFrame(this.animateClaw);
      this.increaseHelper();
    }
  };
  gameRestart = () => {
    this.setState({ current: this.state.pending }, () => {
      this.claw.limit = 700;

      this.gameCounting = 0;
      clearInterval(this.idleGameOver);
      clearInterval(this.idleGameStart);
      this.gifts.position = [];
      this.gifts.success = false;
      this.Satan.success = false;
      this.Satan.x = 50;
      this.gifts.imgArr = this.ImageArr.slice(0);
      this.updateCanvas();
      this.idleGamePending = setInterval(() => {
        if (this.pendingCounter < 30) {
          this.pendingCounter++;
        } else {
          if (this.state.current === this.state.pending) {
            this.setState({ finalV2Show: true, current: this.state.gameEnd });
          } else {
            this.setState(
              { finalV2Show: true, current: this.state.pending },
              () => {
                this.updateCanvas();
              }
            );
          }
          this.pendingCounter = 0;
        }
      }, 1000);
    });
  };
  gameEnd = () => {
    cancelAnimationFrame(this.animationFrameRef);
    this.claw.limit = 700;

    this.setState({ current: this.state.gameEnd, finalV2Show: false }, () => {
      clearInterval(this.idleGameStart);
      clearInterval(this.idleGameOver);
      this.bgPlayer.pause();

      setTimeout(() => {
        this.bgPlayer.play();
      }, 5000);
      this.playerVictory.play();

      this.gifts.position = [];
      this.gifts.success = false;
      this.Satan.success = false;
      this.gifts.imgArr = this.ImageArr.slice(0);
      this.checkIdle();
    });
  };
  handleRestart = () => {
    if (this.state.current === this.state.gameEnd) {
      this.setState({ current: this.state.gameStart }, () => {
        clearInterval(this.idleGameOver);
        this.gameCounting = 0;
        this.claw.limit = 700;
        this.gifts.position = [];
        this.gifts.success = false;
        this.Satan.success = false;
        this.Satan.x = 50;

        this.checkIdle();
        this.updateCanvas();
      });
    }
  };
  handleGameBeginClick = () => {
    clearInterval(this.idleGamePending);
    if (
      this.state.current === this.state.pending ||
      this.state.current === this.state.gameEnd
    ) {
      this.bgPlayer.play();
      this.bgPlayer.volume = 0.5;

      this.pendingCounter = 0;
      this.setState({ current: this.state.gameStart }, () => {
        this.updateCanvas();
        this.checkIdle();
      });
    }
  };
  componentDidMount() {
    this.ImageConfig();
    this.bgPlayer.play();
    setTimeout(() => {
      this.updateCanvas();
    }, 1000);
    this.idleGamePending = setInterval(() => {
      if (this.pendingCounter < 30) {
        this.pendingCounter++;
      } else {
        if (this.state.current === this.state.pending) {
          this.setState({ finalV2Show: true, current: this.state.gameEnd });
        } else {
          this.setState(
            { finalV2Show: true, current: this.state.pending },
            () => {
              this.updateCanvas();
            }
          );
        }
        this.pendingCounter = 0;
      }
    }, 1000);
  }

  render() {
    const fadTxt = this.state.txtGlow ? "controlTxt " : "controlTxt fade";
    const fingerStart =
      this.state.current === this.state.gameStart ? "finger" : "hide";
    const fingerPending =
      this.state.current === this.state.pending ? "finger" : "hide";
    const overlay =
      this.state.current === this.state.pending ? "overlay pending" : "hide";
    const mask = overlay === "overlay pending" ? "mask" : null;
    const firstPageGlow =
      this.state.current === this.state.pending ? "press-me-to-play" : "hide";
    const controlWheel =
      this.state.current !== this.state.gameEnd ? "controlWheel" : "hide";
    const playSanta =
      this.state.current === this.state.pending ? "playSanta" : "hide";
    const finalBlueprint = this.state.finalV2Show
      ? "finalBluePrint.png"
      : "EndFrameV1.png";
    if (this.state.current === this.state.gameEnd) {
      return (
        <div className="giftCatching">
          <audio
            type="audio/mp3"
            src={`${song_url}/scb-yec/ChristmasSong.mp3`}
            ref={ref => (this.bgPlayer = ref)}
            controls
            autoPlay
            loop
          />{" "}
          <audio
            src={`${song_url}/scb-yec/victory.mp3`}
            controls
            ref={ref => (this.playerVictory = ref)}
          />
          <img
            src={`${image_url}${finalBlueprint}`}
            className="endFrame appear"
            alt="Control"
          />
          {this.state.finalV2Show ? (
            <img
              className="end-game-ballon"
              src={`${image_url}CongratsV2.png`}
              alt="end"
            />
          ) : (
            <img
              className="end-game-ballon"
              src={`${image_url}congrats.png`}
              alt="end"
            />
          )}
          {this.state.finalV2Show ? (
            <img
              className="end-game-txt playNow"
              src={`${image_url}PLAY-NOW.png`}
              alt="end"
              onClick={this.handleGameBeginClick}
            />
          ) : (
            <img
              className="end-game-txt"
              src={`${image_url}playAgain.png`}
              alt="end"
              onClick={this.handleRestart}
            />
          )}
          <img
            className="end-game"
            src={`${image_url}glowEndBtn.png`}
            alt="end"
            onClick={
              this.state.finalV2Show
                ? this.handleGameBeginClick
                : this.handleRestart
            }
          />
        </div>
      );
    } else {
      return (
        <div className="giftCatching">
          <audio
            type="audio/mp3"
            src={`${song_url}/scb-yec/ChristmasSong.mp3`}
            ref={ref => (this.bgPlayer = ref)}
            controls
            autoPlay
            loop
          />
          <audio
            type="audio/mp3"
            src={`${song_url}/scb-yec/hydraulicBody.mp3`}
            ref={ref => (this.playerClawArmBody = ref)}
            controls
            loop
          />{" "}
          <audio
            src={`${song_url}/scb-yec/cuteClick.mp3`}
            controls
            ref={ref => (this.playerClick = ref)}
          />
          <canvas ref="canvas" width={1080} height={1920} />
          <img
            src={`${image_url}coverUp.png`}
            className="BlueCover hide"
            alt="Control"
          />
          <img
            className={fingerStart}
            src={`${image_url}fingerPoint.png`}
            alt="finger"
          />
          <div
            className="glitterGlow"
            alt="second"
            onClick={this.handleClick}
          ></div>
          <img
            src={`${image_url}MachineControlUnglow.png`}
            alt="control"
            onClick={this.handleClick}
            className={controlWheel}
          />
          <img
            src={`${image_url}machineControlTxt.png`}
            className={fadTxt}
            onClick={this.handleClick}
            alt="Control"
          />
          <div className="glitterStar"></div>
          {/* <div className={firstPageGlow}></div> */}
          <img
            src={`${image_url}AnotherOverlay.png`}
            alt="overlay"
            className={overlay}
          />
          <img
            src={`${image_url}playSanta.png`}
            alt="overlay"
            className={playSanta}
          />
          <img
            className={`${firstPageGlow}`}
            src={`${image_url}bounceFirstBtn.png`}
            alt="firstBtn"
            onClick={this.handleGameBeginClick}
          />
          <img
            className={`${firstPageGlow} bright`}
            src={`${image_url}glowEndBtn.png`}
            alt="firstBtn"
            onClick={this.handleGameBeginClick}
          />
          <img
            className={`${firstPageGlow} txt`}
            src={`${image_url}tapPlayTxt.png`}
            alt="firstBtn"
            onClick={this.handleGameBeginClick}
          />
          <img
            className={`${fingerPending} pendingFinger`}
            src={`${image_url}FingerPoint.png`}
            alt="finger"
          />
        </div>
      );
    }
  }
}

const image_url = "https://assets.cc.ninetyfivegroup.com/images/scb-yec/";
const song_url = "https://assets.cc.ninetyfivegroup.com/songs";

export default GiftCatching;
