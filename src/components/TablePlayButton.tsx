import { usePlayerStore, type Music } from "@/store/PlayerStore";
import { Play, Pause } from "./Player";

type Props = {
  id: string;
  idList: string | undefined;
};

export const TablePlayButton = ({ id, idList }: Props) => {
  const { isPlaying, setPlaying, currentMusic, setCurrentMusic } =
    usePlayerStore((state) => state);

  const isPlayingList =
    isPlaying &&
    currentMusic.song?.id.toString() === id &&
    currentMusic.playlist?.id === idList;

  const handleClick = async (id: string) => {
    if (isPlayingList) {
      setPlaying(false);
      return;
    }
    try {
      const resp = await fetch(
        `/api/get-info-playlist.json?id=${idList}&idSong=${id}`
      );
      const { songs, playlist, song }: Music = await resp.json();
      setPlaying(true);
      setCurrentMusic({ songs, playlist, song });
    } catch (error) {
      console.log("TableButtonError:", error);
    }
  };

  return (
    <div>
      <button
        onClick={() => handleClick(id)}
        className={`z-50 ${isPlayingList ? "playingSong" : ""}`}
      >
        {isPlayingList ? (
          <div className="fill-green-500">
            <Pause size="small" />
          </div>
        ) : (
          <div className="fill-white">
            <Play size="small" />
          </div>
        )}
      </button>
    </div>
  );
};
