import React from "react";
const Sound = ({ song, ...rest }) => {
  return (
    <audio src={`${song_url}/memory/${song}`} {...rest} controls autoPlay />
  );
};
const song_url = "https://assets.cc.quanterdynamic.com/songs";
export default Sound;
