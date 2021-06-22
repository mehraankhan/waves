import React from "react";

const LibrarySong = ({
  song,
  setCurrentSong,
  audioRef,
  isPlaying,
  songs,
  setSongs,
  setLoading,
}) => {
  const songSelectHandler = async () => {
    await setCurrentSong(song);
    //add active state
    const newSongs = songs.map((cSong) => {
      if (cSong.id === song.id) {
        return { ...cSong, active: true };
      } else {
        return { ...cSong, active: false };
      }
    });
    setSongs(newSongs);

    if (isPlaying) {
      audioRef.current.play();
    }
  };
  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img alt={song.name} src={song.cover}></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
