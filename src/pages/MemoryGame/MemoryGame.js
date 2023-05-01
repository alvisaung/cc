import React from "react";
import "./MemoryGame.css";
import Board from "./Board";
import Footer from "./Footer";
import Home from "./home";
import Song from "./Song";
import api from "services/api";
import WordCard from "./WordCard";

class MemoryGame extends React.Component {
  soundBounceEffect;
  matchWordCard = [
    {
      urlPic1: `${image_url}/memory/matchpic1.png`,
      urlPic2: `${image_url}/memory/matchpic2.png`,
      urlPic3: `${image_url}/memory/matchpic3.png`,
      txtPic: `${image_url}/memory/txtgroup3.svg`,
      wordDes:
        "The Tuas Desalination Plant can produce up to30 million gallons of drinking water a day,the amount used by around 200,000 households daily!"
    },
    {
      urlPic1: `${image_url}/memory/matchpic4.png`,
      urlPic2: `${image_url}/memory/matchpic5.png`,
      urlPic3: `${image_url}/memory/matchpic6.png`,
      txtPic: `${image_url}/memory/txtgroup2.svg`,
      wordDes:
        "The HDB Smart Hub generates real-time insights to optimize maintenance and minimize service disruptionsof key estate services."
    },
    {
      urlPic1: `${image_url}/memory/matchpic7.png`,
      urlPic2: `${image_url}/memory/matchpic8.png`,
      urlPic3: `${image_url}/memory/matchpic9.png`,
      txtPic: `${image_url}/memory/txtgroup1.svg`,
      wordDes:
        "NEA’s Pollution Control Department ensuresthat air quality data and trends are accurately monitored, assessed and analysed."
    },
    {
      urlPic1: `${image_url}/memory/matchpic10.png`,
      urlPic2: `${image_url}/memory/matchpic11.png`,
      urlPic3: `${image_url}/memory/matchpic12.png`,
      txtPic: `${image_url}/memory/txtGroup4.svg`,
      wordDes:
        "NEA’s Pollution Control Department ensuresthat air quality data and trends are accurately monitored, assessed and analysed."
    }
  ];
  state = {
    // pageHome: "pageHome",
    // pageTutorial: "pageTutorial",
    // pageReady: "pageReady",
    // pageInput: "pageInput",
    currentPage: "pageHome",
    wordCard: this.matchWordCard.slice(),
    tryAgain: false,
    win: false,
    pressEffectKey: null,
    click: null,
    campaign_id: 2,
    panel_id: "",
    loopIndex: 0,
    randomCardWinData: null
  };
  componentDidMount() {
     document.addEventListener('contextmenu', event => event.preventDefault());
    this.bouncingSongEffect();
    const urlParams = new URLSearchParams(window.location.search);
    let panel = urlParams.get("panel");

    let panel_id = 4;
    if (panel == "clement") {
      panel_id = 5;
    } else if (panel == "dunearn") {
      panel_id = 6;
    } else if (panel == "eu") {
      panel_id = 7;
    }
    this.playerbg.play();
    this.setState({ panel_id });
  }
  componentWillUnmount() {
    clearInterval(this.soundBounceEffect);
  }
  handleNextPage = () => {
    const { campaign_id, panel_id } = this.state;
    clearInterval(this.soundBounceEffect);
    api.post("analytic", {
      campaign_id,
      panel_id,
      screen_from: "pageHome",
      screen_to: "pageTutorial",
      action: "startPlay"
    });

    this.setState({ currentPage: "pageTutorial", click: true });
  };
  handlePrevPage = () => {
    const { campaign_id, panel_id } = this.state;

    this.bouncingSongEffect();
    this.setState({ currentPage: "pageHome", click: "null" });
    api.post("analytic", {
      campaign_id,
      panel_id,
      screen_from: "pageTutorial",
      screen_to: "pageHome",
      action: "idle"
    });
  };
  handlePlay = () => {
    this.playerbg.play();
  };
  handleStop = () => {
    this.playerbg.pause();
  };
  bouncingSongEffect = () => {
    this.soundBounceEffect = setInterval(() => {
      this.player.play();
    }, 750);
  };
  randomGreatJob = () => {
    const randomCard = this.matchWordCard.slice();
    const randomIndex = this.state.loopIndex;
    const updateLoopIndex = (this.state.loopIndex + 1) % 4;

    this.setState({
      randomCardWinData: randomCard[randomIndex],
      loopIndex: updateLoopIndex
    });
  };
  render() {
    let { currentPage, win, tryAgain, pressEffectKey, click } = this.state;

    // const bgSong = (
    //   <Song song={win || tryAgain ? null : "bgSongNew.mp3"} loop />
    // );
    console.log(this.state.loopIndex);
    const clickSong = <Song song={click && "cuteClick.mp3"} />;
    switch (currentPage) {
      case "pageHome":
        return (
          <div className="App memory-game">
            <audio
              src={`${song_url}/memory/cuteClick.mp3`}
              controls
              autoPlay
              ref={ref => (this.player = ref)}
            />
            <audio
              src={`${song_url}/memory/bgSongNew.mp3`}
              loop
              controls
              autoPlay
              ref={ref => (this.playerbg = ref)}
            />
            <Home nextPage={this.handleNextPage} press={pressEffectKey} />
            <Footer />
          </div>
        );
        break;
      case "pageTutorial":
        return (
          <div className="App memory-game">
            <audio
              src={`${song_url}/memory/bgSongNew.mp3`}
              autoPlay
              loop
              controls
              ref={ref => (this.playerbg = ref)}
            />
            {clickSong}
            <Board
              prevPage={this.handlePrevPage}
              gameStatusChange={this.handleGameStatus}
              handlePlay={() => this.handlePlay()}
              handleStop={() => this.handleStop()}
              randomGreatJob={() => this.randomGreatJob()}
              cardWinData={this.state.randomCardWinData}
            />
            <Footer />
          </div>
        );
        break;

      default:
    }
  }
}
const song_url = "https://assets.cc.quanterdynamic.com/songs";
const image_url = "https://assets.cc.quanterdynamic.com/images";

export default MemoryGame;
