import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({
  songs,
  setSongs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setLoading,
  libraryOpen,
}) => {
  const librarySongs = songs.map((song) => {
    return (
      <LibrarySong
        setCurrentSong={setCurrentSong}
        song={song}
        key={song.id}
        audioRef={audioRef}
        isPlaying={isPlaying}
        songs={songs}
        setSongs={setSongs}
        setLoading={setLoading}
      />
    );
  });

  return (
    <div className={`library ${libraryOpen ? "active-library" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">{librarySongs}</div>
    </div>
  );
};

export default Library;
