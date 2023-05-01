import React from "react";
import "./home.css";

const Home = props => {
  return (
    <div className="home">
      <div className="title">did you know...</div>
      <div className="sub_title">
        <img src={`${image_url}/memory/homeTxt1.svg`} />
      </div>
      <video width="100%" height="200" muted autoPlay loop>
        <source src={`${image_url}/memory/vid.mp4`} type="video/mp4"></source>
        not supported
      </video>
      <div className="challenge_txt">
        <img src={`${image_url}/memory/homeTxt2.svg`} />
      </div>
      <div className="btn-memory">
        <button className="gamestart_btn" onClick={props.nextPage}>
          <img
            src={`${image_url}/memory/challengeBtnText.svg`}
            className="bounce"
          />
        </button>
      </div>

      <div className="hidden">
        <img src={`${image_url}/memory/computer.jpeg`} />
        <img src={`${image_url}/memory/global.jpeg`} />
        <img src={`${image_url}/memory/material.jpeg`} />
        <img src={`${image_url}/memory/electric.jpg`} />
        <img src={`${image_url}/memory/geotechnical.jpeg`} />
      </div>
    </div>
  );
};

const image_url = "https://assets.cc.quanterdynamic.com/images";

export default Home;
