import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

function AudionPlayer({ image, audioSrc }) {
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMute, setIsMute] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);

  function handleDuration(e) {
    setCurrentTime(e.target.value);
    audioRef.current.currentTime = e.target.value;
  }

  function handleVolume(e) {
    setVolume(e.target.value);
    audioRef.current.volume = e.target.value;
  }

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (isMute) {
      setIsMute(false);
    } else {
      setIsMute(true);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isMute) {
      audioRef.current.volume = 1;
      setVolume(1);
    } else {
      audioRef.current.volume = 0;
      setVolume(0);
    }
  }, [isMute]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetaData);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetaData);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetaData = () => {
    setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time/60);
    const seconds = Math.floor(time%60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <div className="custom-audio-player">
      <img src={image} className="display-image-player" />
      <audio ref={audioRef} src={audioSrc} />
      <div className="duration-flex">
        <p className="audio-btn" onClick={togglePlay}> {isPlaying ? <FaPause /> : <FaPlay />}</p>
        <p>{formatTime(currentTime)}</p>
        <input
          type="range"
          max={duration}
          value={currentTime}
          step={0.01}
          className="duration-range"
          onChange={handleDuration}
        />
        <p>-{formatTime(duration-currentTime)}</p>
      </div>
      <div className="volume-flex">
        <p className="audio-btn" onClick={toggleMute}>{isMute ? <FaVolumeUp /> : <FaVolumeMute />}</p>
        <input
          type="range"
          value={volume}
          max={1}
          min={0}
          step={0.01}
          className="volume-range"
          onChange={handleVolume}
        />
      </div>
    </div>
  );
}

export default AudionPlayer;
