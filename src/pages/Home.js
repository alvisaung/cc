import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.scss";

class Home extends Component {
  image = [
    {
      src: "./video/bagel.mp4",
      name: "Bagel",
      url: "/bagel?anim=true",
      is_vdo: true,
    },
    {
      src: "./video/dengue.mp4",
      name: "Memory Game",
      url: "/dengue-memory-game",
      is_vdo: true,
    },
    {
      src: "./video/gift-catch.mp4",
      name: "Gift Catching",
      url: "/scb-yec",
      is_vdo: true,
    },
    {
      src: "./video/golf.mp4",
      name: "HSBC Golf Game",
      url: "/hsbc-golf-swing",
      is_vdo: true,
    },
    {
      src: "./video/jap-curry.mp4",
      name: "Jap Curry Game",
      url: "/jap-curry-game",
      is_vdo: true,
    },
    {
      src: "./images/uniqlo.png",
      name: "Uniqlo",
      url: "/uniqlo",
    },
    {
      src: "./images/Kaplan.jpg",
      name: "Kaplan",
      url: "/kaplan",
    },
    {
      src: "./images/Wally-Sally.jpg",
      name: "Wally Sally",
      url: "/wally-sally",
    },
    {
      src: "./images/ball.png",
      name: "MCD World Cup",
      url: "/mcd-cup?set=A&panel=9212",
    },

    {
      src: "./images/panda.png",
      name: "LLAP",
      url: "/llap",
    },
    {
      src: "./images/face-recog.png",
      name: "Emotion Detector",
      url: "/face-emo",
    },
    {
      src: "./images/voice-recog.jpeg",
      name: "Voice Recognition",
      url: "/vdo",
    },
    {
      src: "./images/pru-distance.jpg",
      name: "Prudential",
      url: "/pru-distance?distance=500",
    },
    {
      src: "./images/mcd-v2.jpg",
      name: "MCD Clock 2.0",
      url: "/mcd-v2",
    },
  ];
  render() {
    return (
      <div className="home-app-gp">
        <img src={"./images/logo.png"} className="clear-channel-logo" alt="logo" />

        <div className="home-app-wrapper">
          {this.image?.map((item, i) => {
            return (
              <div className="icon-gp">
                <Link key={i} to={item.url}>
                  {item.is_vdo ? (
                    <video className="home-app-vdo" autoPlay loop muted>
                      <source src={item.src} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={item?.src} alt="Imgs" className="home-app-icon" />
                  )}
                  <div className="home-app-name">{item?.name}</div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Home;
