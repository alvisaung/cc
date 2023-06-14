// import React, { useEffect, useRef } from "react";
// import * as faceapi from "face-api.js";
// import "./style.css";
// import Smile from "./smile.png";
// const FaceSmileFilter = () => {
//   const videoRef = useRef();
//   const canvasRef = useRef();

//   useEffect(() => {
//     startVideo();

//     videoRef && loadModels();
//   }, []);

//   const loadModels = () => {
//     Promise.all([faceapi.nets.tinyFaceDetector.loadFromUri("/models"), faceapi.nets.faceLandmark68Net.loadFromUri("/models"), faceapi.nets.faceRecognitionNet.loadFromUri("/models"), faceapi.nets.faceExpressionNet.loadFromUri("/models")]).then(() => {
//       faceDetection();
//     });
//   };

//   const startVideo = () => {
//     navigator.mediaDevices
//       .getUserMedia({ video: true })
//       .then((currentStream) => {
//         videoRef.current.srcObject = currentStream;
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };

//   const faceDetection = async () => {
//     const canvas = canvasRef.current;
//     canvas.width = 640;
//     canvas.height = 480;
//     const ctx = canvas.getContext("2d");
//     console.log("hi");
//     // setInterval(async () => {
//     ctx.translate(0, 0);
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
//     //   console.log(detections);
//     canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(videoRef.current);

//     detections.forEach((detection) => {
//       const mouth = detection.landmarks.getMouth();

//       const mouthLeft = mouth[0].x;

//       const mouthRight = mouth[mouth.length - 1].x;
//       const mouthTop = mouth.reduce((max, point) => (point.y > max ? point.y : max), -Infinity);
//       const mouthBottom = mouth.reduce((min, point) => (point.y < min ? point.y : min), Infinity);
//       const smileySize = Math.min(mouthRight - mouthLeft, mouthBottom - mouthTop);
//       const smileyImg = new Image();
//       smileyImg.src = Smile;

//       smileyImg.onload = () => {
//         //   console.log({ mouthLeft });
//         //   ctx.drawImage(smileyImg, mouthLeft - smileySize / 2, mouthTop - smileySize / 2, 100, 100);
//         //   console.log({ mouthLeft, mouthTop: mouthTop - 50 });
//         ctx.drawImage(smileyImg, mouthLeft - 50, mouthTop - 40, 100, 40);
//       };
//     });
//     requestAnimationFrame(faceDetection);
//     // }, 500);
//   };

//   return (
//     <div className="app">
//       <h1> AI FACE DETECTION</h1>
//       <div className="app__video">
//         <video crossOrigin="anonymous" ref={videoRef} autoPlay></video>
//       </div>
//       <canvas ref={canvasRef} className="canvas" style={{ position: "absolute", top: "9%" }} />
//     </div>
//   );
// };

// export default FaceSmileFilter;
