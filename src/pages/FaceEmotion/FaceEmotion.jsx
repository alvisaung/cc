import React, { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

const FaceEmotion = () => {
  const videoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    startVideo();
    console.log(videoRef);
    loadModels();
  }, []);

  const loadModels = () => {
    Promise.all([faceapi.nets.tinyFaceDetector.loadFromUri("/models"), faceapi.nets.faceLandmark68Net.loadFromUri("/models"), faceapi.nets.faceRecognitionNet.loadFromUri("/models"), faceapi.nets.faceExpressionNet.loadFromUri("/models")]).then(() => {
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
    setInterval(async () => {
      console.log("HI");
      const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
      console.log(detections);
      canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(videoRef.current);
      faceapi.matchDimensions(canvasRef.current, {
        width: 940,
        height: 650,
      });

      const resized = faceapi.resizeResults(detections, {
        width: 940,
        height: 650,
      });

      faceapi.draw.drawDetections(canvasRef.current, resized);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
      faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
    }, 1000);
  };

  return (
    <div className="app">
      <h1> AI FACE DETECTION</h1>
      <div className="app__video">
        <video crossOrigin="anonymous" ref={videoRef} autoPlay></video>
      </div>
      <canvas ref={canvasRef} width="940" height="650" className="app__canvas" />
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
