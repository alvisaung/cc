import React, { Component } from "react";
import "./Board.css";
//components
import Card from "./Card";
import MatchingWord from "./MatchingWord";
import Sound from "./Song";
import WordCard from "./WordCard";
class Board extends Component {
  time = 20;
  replayAllTimer = 20;
  interval;
  // immutable cards and pop up card data source
  cards = [
    {
      val: "computer",
      match: false,
      url: `${image_url}/memory/computer.jpeg`,
      hidden: true
    },
    {
      val: "computer",
      match: false,
      url: `${image_url}/memory/computer.jpeg`,
      hidden: true
    },
    {
      val: "global",
      match: false,
      url: `${image_url}/memory/global.jpeg`,
      hidden: true
    },
    {
      val: "global",
      match: false,
      url: `${image_url}/memory/global.jpeg`,
      hidden: true
    },
    {
      val: "material",
      match: false,
      url: `${image_url}/memory/material.jpeg`,
      hidden: true
    },
    {
      val: "material",
      match: false,
      url: `${image_url}/memory/material.jpeg`,
      hidden: true
    },
    {
      val: "electric",
      match: false,
      url: `${image_url}/memory/electric.jpg`,
      hidden: true
    },
    {
      val: "electric",
      match: false,
      url: `${image_url}/memory/electric.jpg`,
      hidden: true
    },
    {
      val: "geotech",
      match: false,
      url: `${image_url}/memory/geotechnical.jpeg`,
      hidden: true
    },
    {
      val: "geotech",
      match: false,
      url: `${image_url}/memory/geotechnical.jpeg`,
      hidden: true
    }
  ];

  // state
  state = {
    cards: JSON.parse(JSON.stringify(this.cards)),

    firstCardVal: null,
    firstCardId: null,
    gameStatus: "firstState",
    randomCardWinData: null,
    win: false,
    tryAgain: false,
    match: null,
    time: this.time,
    clickable: false,
    startMatching: false,
    tutorialTitleImgUrl: `${image_url}/memory/tutorialTitleText.svg`,
    readyTitleImgUrl: `${image_url}/memory/readyTitleTxt.svg`,
    replayAllTimer: this.replayAllTimer,
    clickSong: null,
    firstTimeClick: true,
    loopIndex: 0
  };
  // counting time, shuffle card
  componentDidMount() {
    this.shuffle();
    this.countingTime();
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  // shuffle card method
  shuffle = () => {
    let cardRender = this.state.cards.slice();
    let j = 0;
    let temp = null;
    for (let index = cardRender.length - 1; index >= 0; index--) {
      j = Math.floor(Math.random() * (index + 1));
      temp = cardRender[index];
      cardRender[index] = cardRender[j];
      cardRender[j] = temp;
    }
    this.setState({ cards: cardRender, clickSong: null }, () => {
      if (!this.state.startMatching) {
        this.tutorialShowing();
      }
    });
  };
  // handling click & changes of game status
  handleClick = i => {
    //test

    //test

    const cards = JSON.parse(JSON.stringify(this.state.cards));
    console.log("clickable", this.state.clickable);
    const card = cards[i];
    if (card.hidden && this.state.clickable) {
      this.flipCard(i);
      this.player.play();
      switch (this.state.gameStatus) {
        case "firstState":
          this.setState({
            match: null,
            firstCardVal: card.val,
            firstCardId: i,
            gameStatus: "secState"
          });
          break;
        case "secState":
          if (this.state.firstCardVal == card.val) {
            this.setMatch(this.state.firstCardId);
            this.setMatch(i);

            this.setState({
              match: true,
              firstCardVal: null,
              firstCardId: null,
              gameStatus: "firstState"
            });
            if (this.checkWin()) {
              this.props.randomGreatJob();
              this.props.handleStop();
              setTimeout(() => {
                this.props.handlePlay();
              }, 2000);
              setTimeout(() => {
                this.setState({ win: true });
              }, 670);
            }
          } else {
            setTimeout(() => {
              this.flipCard(this.state.firstCardId);
              console.log(this.state.firstCardId);
              this.props.handlePlay();
              this.flipCard(i);
              this.setState({
                match: false,
                firstCardVal: null,
                firstCardId: null,
                clickable: true,
                gameStatus: "firstState",
                clickSong: null
              });
            }, 670);
            this.setState({ clickable: false });
          }
          break;
        default:
      }
    }
  };

  checkWin = () => {
    return this.state.cards.every(currCard => currCard.match);
  };
  // setting the matched card
  setMatch = i => {
    let clickedCard = this.state.cards.slice();
    clickedCard[i].match = !clickedCard[i].match;

    this.setState({
      cards: clickedCard
    });
  };
  // flip the card
  flipCard = i => {
    let clickedCard = this.state.cards.slice();
    clickedCard[i].hidden = !clickedCard[i].hidden;
    this.setState({
      cards: clickedCard,
      clickSong: true
    });
  };
  // count time , if lower 0 , tryagain
  countingTime = () => {
    this.interval = setInterval(() => {
      if (this.state.win) {
        this.replayAllTimer--;
        this.setState({ replayAllTimer: this.replayAllTimer }, () => {
          if (this.replayAllTimer < 0) {
            this.restartAll();
          }
        });
      } else if (this.state.tryAgain) {
        this.time--;
        this.setState({ time: this.time });
        setTimeout(() => {
          this.props.handlePlay();
        }, 5000);

        if (this.time < 0) {
          this.restartAll();
        }
      } else if (this.time > 0) {
        this.time--;
        this.setState({ time: this.time });
      } else if (!this.state.startMatching) {
        console.log("start matching");
        this.setState(
          {
            startMatching: true
          },
          () => {
            this.tutorialShowing();
            this.setState({ clickable: true });
          }
        );
      } else {
        this.time = 20;
        this.props.handleStop(true);
        this.setState({
          tryAgain: true,
          clickable: false,
          time: this.time
        });
      }
    }, 1000);
  };
  // tutorial page ( setting all hidden to false)
  tutorialShowing = () => {
    let cards = this.state.cards.slice();

    cards.map(card => {
      card.hidden = !card.hidden;
    });

    if (this.state.startMatching) {
      this.time = 20;
      this.setState({ time: this.time });
    }
    this.setState({
      cards
    });
  };
  //restart all
  restartAll = () => {
    this.props.prevPage();
  };
  //For pop up

  //give out random data

  //reseting all value here
  tryAgainHandler = () => {
    this.time = 20;
    this.replayAllTimer = 20;
    this.songControl();

    this.setState(
      {
        cards: JSON.parse(JSON.stringify(this.cards)),
        firstCardVal: null,
        firstCardId: null,
        gameStatus: "firstState",
        randomCardWinData: null,
        win: false,
        tryAgain: false,
        time: this.time,
        clickable: false,
        startMatching: false,
        clickSong: true
      },
      () => {
        setTimeout(() => {
          clearInterval(this.interval);
          this.shuffle();
          this.countingTime();
        }, 500);
      }
    );
  };

  songControl = bool => {
    return bool;
  };

  render() {
    const {
      cards,
      win,
      randomCardWinData,
      tryAgain,
      tutorialTitleImgUrl,
      readyTitleImgUrl,
      startMatching,
      match,
      clickSong
    } = this.state;

    console.log("board loop", this.state.loopIndex);
    const listCards = cards.map((card, i) =>
      i % 2 == 0 ? (
        <Card
          key={i}
          card={card.val}
          img={card.url}
          hidden={card.hidden}
          match={card.match}
          left={true}
          onClick={() => this.handleClick(i)}
        />
      ) : (
        <Card
          key={i}
          card={card.val}
          img={card.url}
          hidden={card.hidden}
          match={card.match}
          left={false}
          onClick={() => this.handleClick(i)}
        />
      )
    );
    const song = <Sound song={!match && "unMatchSong.mp3"} />;
    const winLoseSong = (
      <Sound
        song={win ? "victorySong.mp3" : tryAgain ? "loseSong.mp3" : null}
      />
    );

    return (
      <div className="cardGroup">
        {match != null ? song : null}
        {win || tryAgain ? winLoseSong : null}
        <audio
          src={`${song_url}/memory/cuteClick.mp3`}
          controls
          ref={ref => (this.player = ref)}
        />

        <div className="title">
          <img src={startMatching ? readyTitleImgUrl : tutorialTitleImgUrl} />{" "}
        </div>
        <div className="time-remain">Time Remaining:</div>
        <div className="sec">
          {win ? this.state.replayAllTimer : this.state.time}
        </div>

        {win && (
          <MatchingWord
            wordCard={this.props.cardWinData}
            onTryAgain={this.tryAgainHandler}
          />
        )}
        {tryAgain && (
          <MatchingWord wordCard="TryAgain" onTryAgain={this.tryAgainHandler} />
        )}
        {listCards}
      </div>
    );
  }
}

const image_url = "https://assets.cc.quanterdynamic.com/images";
const song_url = "https://assets.cc.quanterdynamic.com/songs";

export default Board;
