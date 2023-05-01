import React, { useState, useEffect } from "react";

const ShakingDetector = () => {
  const [isShaking, setIsShaking] = useState(false);

  const handleShakeEvent = (event) => {
    const acceleration = event.accelerationIncludingGravity;
    const shakeThreshold = 15; // Adjust this value to fine-tune the sensitivity
    const isShaking = Math.abs(acceleration.x) > shakeThreshold || Math.abs(acceleration.y) > shakeThreshold || Math.abs(acceleration.z) > shakeThreshold;
    setIsShaking(isShaking);
  };

  useEffect(() => {
    if (typeof DeviceMotionEvent.requestPermission === "function") {
      DeviceMotionEvent.requestPermission().then((permissionState) => {
        if (permissionState === "granted") {
          window.addEventListener("devicemotion", handleShakeEvent);
        }
      });
    } else {
      window.addEventListener("devicemotion", handleShakeEvent);
    }
    return () => {
      window.removeEventListener("devicemotion", handleShakeEvent);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#FFFFFF",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#F5F5F5",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h2>Your Volume</h2>
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            backgroundColor: isShaking ? "#FF0000" : "#00FF00",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#FFFFFF",
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "20px",
            transform: isShaking ? "rotate(-15deg)" : "rotate(0deg)",
            transition: "all 0.2s ease-in-out",
          }}
        >
          {isShaking ? "Shaking" : "Not shaking"}
        </div>
        <p>Shake your device to test the detector</p>
      </div>
    </div>
  );
};

export default ShakingDetector;
