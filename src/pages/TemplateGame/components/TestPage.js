import React from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  height: 1900,
  width: 1080,
  facingMode: "user",
};

export default function TestPage({ nextPage }) {
  return (
    <div id="test-page">
      <h1
        style={{
          position: "relative",
          textAlign: "center",
          fontSize: "3em",
          fontFamily: "SubwayBold",
          paddingTop: 313,
          margin: "auto",
          width: "80%",
        }}
      >
        This temporary page is to ensure that camera working
      </h1>
      <Webcam
        videoConstraints={videoConstraints}
        audio={false}
        className={"camRef"}
        screenshotFormat="image/jpeg"
        screenshotQuality={1}
        mirrored={true}
        style={{ width: "100%", position: "absolute", left: 0, zIndex: 10 }}
      />
      <button
        style={{
          position: "relative",
          width: "90%",
          fontSize: "4em",
          margin: "auto",
          marginTop: "90%",
          display: "flex",
          justifyContent: "center",
        }}
        onClick={() => nextPage("#test-page", "#first-page")}
      >
        Camera Work, Start Game
      </button>
    </div>
  );
}
