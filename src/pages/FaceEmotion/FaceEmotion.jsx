import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import "./FaceEmotion.scss";

const FaceEmotion = () => {
  const videoRef = useRef();
  const [loading_model, setLoadModel] = useState(true);

  const [rect_loc, setRectLoc] = useState({ x: 0, y: 0, width: 0, height: 0, expression: "", percent: "0" });
  const faceDetectInterval = useRef(null);
  useEffect(() => {
    startVideo();
    loadModels();
    return () => {
      faceDetectInterval.current && clearInterval(faceDetectInterval.current);
    };
  }, []);

  const loadModels = () => {
    Promise.all([faceapi.nets.tinyFaceDetector.loadFromUri("/models"), faceapi.nets.faceLandmark68Net.loadFromUri("/models"), faceapi.nets.faceRecognitionNet.loadFromUri("/models"), faceapi.nets.faceExpressionNet.loadFromUri("/models")]).then(() => {
      setLoadModel(false);
      faceDetection();
    });
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((currentStream) => {
        videoRef.current.srcObject = currentStream;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const faceDetection = async () => {
    faceDetectInterval.current = setInterval(async () => {
      const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
      if (detections.length > 0) {
        const detect = detections[0];

        const { alignedRect, expressions } = detect;
        const expression_list = expressions.asSortedArray();
        const { expression, probability } = expression_list[0];
        const { x, y, width, height } = alignedRect.box;
        const replace = { x, y, width, height, expression: expression, percent: probability.toFixed(2) };
        setRectLoc(replace);
      }

      // console.log(replace);
      // canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(videoRef.current);
      // faceapi.matchDimensions(canvasRef.current, {
      //   width: 940,
      //   height: 650,
      // });

      // const resized = faceapi.resizeResults(detections, {
      //   width: 940,
      //   height: 650,
      // });

      // faceapi.draw.drawDetections(canvasRef.current, resized);
      // faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
      // faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
    }, 500);
  };

  return (
    <div>
      <div> AI FACE DETECTION</div>

      <h1 style={{ display: loading_model ? "block" : "none" }}>Loading Model...</h1>
      <div style={{ display: loading_model ? "none" : "block" }}>
        <div className="app__video">
          <video crossOrigin="anonymous" ref={videoRef} autoPlay></video>
        </div>
        <div className="box" style={{ left: rect_loc.x, top: rect_loc.y, width: rect_loc.width, height: rect_loc.height }}>
          <span>
            {rect_loc.expression}: {rect_loc.percent}%
          </span>
        </div>
      </div>

      {/* <canvas ref={canvasRef} widtsh="940" height="650" className="app__canvas" style={{ background: "red" }} /> */}
    </div>
  );
};
const moods = {
  happy: ["happy", "surprised"],
  sad: ["sad", "disgusted", "angry"],
  neutral: ["neutral"],
};

function analyzeMood(imageDataUrl) {
  const img = new Image();
  img.src = imageDataUrl;

  return new Promise((resolve, reject) => {
    img.onload = async () => {
      const detection = await faceapi.detectSingleFace(img).withFaceExpressions();
      const expressions = detection.expressions;
      const maxExpression = Object.keys(expressions).reduce((a, b) => (expressions[a] > expressions[b] ? a : b));
      const mood = Object.keys(moods).find((mood) => moods[mood].includes(maxExpression));
      resolve(mood);
    };

    img.onerror = (err) => reject(err);
  });
}

export default FaceEmotion;
