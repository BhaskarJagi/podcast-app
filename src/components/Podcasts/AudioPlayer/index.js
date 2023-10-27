import React, { useRef, useState } from "react";
import "./styles.css";

function AudionPlayer({ image, audioSrc }) {
  const audioRef = useRef();
  const [duration, setDuration] = useState();
  const [volume, setVolume] = useState(1);

  function handleDuration(e) {
    setDuration(e.target.value);
  }

  return (
    <div className="custom-audio-player">
      <img src={image} className="display-image-player" />
      <audio ref={audioRef} src={audioSrc} />
      <div className="duration-flex">
        <p>0:0</p>
        <input
          type="range"
          className="duration-range"
          onChange={handleDuration}
        />
        <p>24:0</p>
      </div>
    </div>
  );
}

export default AudionPlayer;
