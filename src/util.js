//skip a track forward or backwards
export const skipTrackHandler = async (
  direction,
  currentSong,
  songs,
  audioRef,
  setCurrentSong,
  isPlaying,
  setSongs
) => {
  const activeLibraryHandler = (nextPrev) => {
    //add active state
    const newSongs = songs.map((cSong) => {
      if (cSong.id === nextPrev.id) {
        return { ...cSong, active: true };
      } else {
        return { ...cSong, active: false };
      }
    });
    setSongs(newSongs);
  };

  let currentSongIndex = songs.findIndex((song) => song.id === currentSong.id);
  if (direction === "forward") {
    await setCurrentSong(
      songs[currentSongIndex + 1 > songs.length - 1 ? 0 : currentSongIndex + 1]
    );
    activeLibraryHandler(
      songs[currentSongIndex + 1 > songs.length - 1 ? 0 : currentSongIndex + 1]
    );
  } else if (direction === "back") {
    await setCurrentSong(
      songs[currentSongIndex - 1 < 0 ? songs.length - 1 : currentSongIndex - 1]
    );
    activeLibraryHandler(
      songs[currentSongIndex - 1 < 0 ? songs.length - 1 : currentSongIndex - 1]
    );
  }

  if (isPlaying) {
    const playPromise = audioRef.current.play();

    if (playPromise !== undefined) {
      playPromise.then((_) => {}).catch((error) => {});
    }
  }
};
