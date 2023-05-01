import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";

class Home extends Component {
  image = [
    {
      src: "./images/Bagel.png",
      name: "Bagel",
      url: "/bagel?anim=true",
    },
    {
      src: "./images/DengueMemoryGame.png",
      name: "Dengue Memory Game",
      url: "/dengue-memory-game",
    },

    {
      src: "./images/GiftCatching.jpg",
      name: "Gift Catching",
      url: "/scb-yec",
    },

    {
      src: "./images/HSBC-Golf-Game.jpg",
      name: "HSBC Golf Game",
      url: "/hsbc-golf-swing",
    },

    {
      src: "./images/Jap-Curry-Game.jpg",
      name: "Jap Curry Game",
      url: "/jap-curry-game",
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
  ];
  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 80, backgroundColor: "#282c34" }}>
        <div style={{ marginTop: 100 }}>
          <img src={"./images/logo.png"} className="App-logo" alt="logo" />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
              flexWrap: "wrap",
              gap: 30,
              rowGap: 60,
            }}
          >
            {this.image?.map((item, i) => {
              return (
                <Link key={i} to={item.url}>
                  <img
                    src={item?.src}
                    alt="Imgs"
                    style={{
                      width: 200,
                      height: 200,
                      backgroundColor: "white",
                      marginRight: "5px",
                      borderRadius: 10,
                    }}
                  />
                  <div
                    style={{
                      textAlign: "center",
                      fontSize: "20px",
                      color: "white",
                      marginTop: 6,
                    }}
                  >
                    {item?.name}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
