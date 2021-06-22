import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { skipTrackHandler } from "../util";

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  songInfo,
  setSongInfo,
  audioRef,
  songs,
  setSongs,
  setCurrentSong,
}) => {
  //styles
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  //event handlers
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  const getSum = (val1, val2) => {
    return (Number(val1) + Number(val2)).toFixed(12);
  };
  const volumeUpHandler = (e) => {
    if (songInfo.volume < 1) {
      audioRef.current.volume = getSum(songInfo.volume, 0.1);
      setSongInfo({ ...songInfo, volume: audioRef.current.volume });
    }
  };
  const volumeDownHandler = (e) => {
    if (songInfo.volume > 0) {
      audioRef.current.volume = getSum(songInfo.volume, -0.1);
      setSongInfo({ ...songInfo, volume: audioRef.current.volume });
    }
  };
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: audioRef.current.currentTime });
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            min={0}
            max={songInfo.duration || 0} //add a default value whilst the song loads
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <div style={trackAnim} className="animate-track"></div>{" "}
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => {
            skipTrackHandler(
              "back",
              currentSong,
              songs,
              audioRef,
              setCurrentSong,
              isPlaying,
              setSongs
            );
          }}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => {
            skipTrackHandler(
              "forward",
              currentSong,
              songs,
              audioRef,
              setCurrentSong,
              isPlaying,
              setSongs
            );
          }}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
      <div className="volume-control">
        <FontAwesomeIcon onClick={volumeUpHandler} size="2x" icon={faAngleUp} />
        <p>{`${songInfo.volume * 100}%`}</p>
        <FontAwesomeIcon
          onClick={volumeDownHandler}
          size="2x"
          icon={faAngleDown}
        />
      </div>
    </div>
  );
};

export default Player;
