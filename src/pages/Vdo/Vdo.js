import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export default function Vdo() {
  const [volume, setVolume] = useState(0);
  const leaderboard = useRef([]);
  const shoutStart = useRef(null);
  let max_v = 0;

  useEffect(() => {
    let stream, audioContext, analyser, dataArray, updateVolumeInterval;

    const handleStream = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        audioContext = new AudioContext();
        analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);

        const updateVolume = () => {
          analyser.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;
          let _v = Math.round((average / 255) * 100);
          setVolume(_v);
          max_v = _v > max_v ? _v : max_v;
          // console.log(_v);
          if (shoutStart.current == null && _v >= 10) {
            shoutStart.current = new Date();
          } else if (shoutStart.current && _v < 10) {
            console.log("END");
            const shoutEnd = new Date();
            const shoutDuration = (shoutEnd.getTime() - shoutStart.current.getTime()) / 1000;
            shoutStart.current = null;
            // update leaderboard
            const newEntry = { volume: max_v, time: shoutDuration };
            max_v = 0;
            const newLeaderboard = [...leaderboard.current, newEntry].sort((a, b) => b.volume - a.volume);
            leaderboard.current = newLeaderboard.slice(0, 5);
          }
        };
        updateVolumeInterval = setInterval(updateVolume, 100);
      } catch (error) {
        console.log(error);
      }
    };

    handleStream();

    return () => {
      if (audioContext && analyser) {
        clearInterval(updateVolumeInterval);
        analyser.disconnect(audioContext.destination);
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);
  return (
    <SoundMeterContainer>
      <Leaderboard>
        <Title>Leaderboard</Title>
        {leaderboard.current.length > 0 ? (
          leaderboard.current.map((entry, index) => (
            <LeaderboardEntry key={index}>
              <div>
                <strong>{entry.volume}%</strong> for <strong>{entry.time}s</strong>
              </div>
            </LeaderboardEntry>
          ))
        ) : (
          <p>No entries yet</p>
        )}
      </Leaderboard>
      <VolumeContainer>
        <Title>Your Volume</Title>
        <Subtitle>How loud can you shout?</Subtitle>
        <VolumeLevel>{volume}</VolumeLevel>
        <VolumeBar style={{ width: `${volume}%` }}>
          <div></div>
        </VolumeBar>
      </VolumeContainer>
    </SoundMeterContainer>
  );
}
const LeaderboardEntry = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: 1rem;

  span {
    font-weight: bold;
    margin-right: 10px;
  }

  .time {
    font-size: 0.8rem;
    color: #666;
  }
`;

const Leaderboard = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const LeaderboardItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const SoundMeterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fff;
`;

const VolumeContainer = styled.div`
  background-color: #f5f5f5;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #666;
`;

const VolumeBar = styled.div`
  height: 150px;
  background-color: #1e90ff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 0;
    background-color: #fff;
    opacity: 0.3;
    transition: height 0.2s ease-in-out;
  }
`;

const VolumeLevel = styled.div`
  font-size: 4rem;
  color: #333;
  margin-bottom: 20px;
`;
