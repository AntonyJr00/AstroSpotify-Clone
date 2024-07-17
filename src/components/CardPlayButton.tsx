import { usePlayerStore, type Music } from "@/store/PlayerStore";
import { Play, Pause } from "./Player";

type Props = {
  id: string;
  size: string;
};

export const CardPlayButton = ({ id, size = "small" }: Props) => {
  const { isPlaying, setPlaying, currentMusic, setCurrentMusic } =
    usePlayerStore((state) => state);

  const isPlayingList = isPlaying && currentMusic.playlist?.id === id;

  const handleClick = async (id: string) => {
    if (isPlayingList) {
      setPlaying(false);
      return;
    }

    try {
      const resp = await fetch(`/api/get-info-playlist.json?id=${id}`);
      const { songs, playlist }: Music = await resp.json();
      setCurrentMusic({ songs, playlist, song: songs[0] });
      setPlaying(true);
    } catch (error) {
      console.log("CardButtonError:", error);
    }
  };

  const sizeButton = size && size === "large" ? "w-14 h-14" : "w-12 h-12";

  return (
    <div>
      <button
        onClick={() => handleClick(id)}
        className={`z-50 bg-green-500 grid place-content-center rounded-full hover:scale-105 duration-300 ${sizeButton}`}
      >
        {isPlayingList ? <Pause size={size} /> : <Play size={size} />}
      </button>
    </div>
  );
};
