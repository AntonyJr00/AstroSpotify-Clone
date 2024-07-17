import { useEffect, useRef, useState, type RefObject } from "react";
import { usePlayerStore } from "@/store/PlayerStore";
import type { Store, Music } from "@/store/PlayerStore";
import { Slider } from "@/components/Slider";
import { songs } from "@/lib/data";

// *Iconos:------------------------------
// *:---------------

export const Pause = ({ size }: { size: string }) => {
  return (
    <svg
      role="img"
      aria-hidden="true"
      viewBox="0 0 16 16"
      width={size === "large" ? 20 : 16}
      height={size === "large" ? 20 : 16}
    >
      <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
    </svg>
  );
};

export const Play = ({ size }: { size: string }) => {
  return (
    <svg
      role="img"
      aria-hidden="true"
      viewBox="0 0 16 16"
      width={size === "large" ? 20 : 16}
      height={size === "large" ? 20 : 16}
    >
      <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
    </svg>
  );
};

export const ArrowLeft = () => {
  return (
    <svg
      width="16"
      height="16"
      role="img"
      aria-hidden="true"
      viewBox="0 0 16 16"
    >
      <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z"></path>
    </svg>
  );
};

export const ArrowRight = () => {
  return (
    <svg
      width="16"
      height="16"
      role="img"
      aria-hidden="true"
      viewBox="0 0 16 16"
    >
      <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"></path>
    </svg>
  );
};

export const VolumeSilence = () => (
  <svg
    role="presentation"
    height="16"
    width="16"
    aria-hidden="true"
    aria-label="Volumen apagado"
    viewBox="0 0 16 16"
  >
    <path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"></path>
    <path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path>
  </svg>
);

export const Volume = () => (
  <svg
    role="presentation"
    height="16"
    width="16"
    aria-hidden="true"
    aria-label="Volumen alto"
    id="volume-icon"
    viewBox="0 0 16 16"
  >
    <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path>
    <path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path>
  </svg>
);

// *:---------------
// *Iconos:------------------------------

type CurretnSongType = {
  title: string | undefined;
  image: string | undefined;
  artists: string[] | undefined;
};
export const CurrentSong = ({ title, image, artists }: CurretnSongType) => {
  return (
    <div className="flex gap-4 items-center">
      <picture className="w-14 h-14 bg-zinc-800 rounded-lg shadow-lg overflow-hidden cursor-pointer">
        <img className="w-14 h-14" src={image} alt={title || "img"} />
      </picture>
      <div>
        <h3 className="font-semibold block text-sm cursor-pointer">
          {title || "titulo"}
        </h3>
        <span className="font-light block text-base text-gray-300 opacity-90 cursor-pointer">
          {artists || "nombre del artista"}
        </span>
      </div>
      <div className="cursor-pointer text-lg">
        <span className="hover:scale-110 duration-300 text-green-500">❤</span>
      </div>
    </div>
  );
};

type TypeSongControl = { audio: RefObject<HTMLAudioElement> };
const SongControl = (props: TypeSongControl) => {
  const { audio } = props;
  const [currentTime, setCurrentTime] = useState(0);
  const handleTimeUpdate = () => {
    if (audio.current?.currentTime) {
      setCurrentTime(audio.current.currentTime);
    }
  };

  useEffect(() => {
    audio.current?.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      audio.current?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  });

  const duration = audio.current?.duration;

  const musicFormatTime = (sec = 0) => {
    const minutes = Math.floor(sec / 60).toString();
    const seconds = Math.trunc(sec % 60).toString();
    return minutes
      .padStart(1, "0")
      .concat(":")
      .concat(seconds.padStart(2, "0"));
  };

  return (
    <div className="flex items-center">
      <span className="text-xs opacity-70 w-8 justify-self-start">
        {musicFormatTime(currentTime)}
      </span>

      <div className="h-full group">
        <Slider
          defaultValue={[0]}
          max={audio.current?.duration ?? 0}
          min={0}
          step={1}
          className="w-[620px] touch-none select-none"
          value={[currentTime]}
          onValueChange={(value) => {
            const [newValue] = value;
            if (audio.current) audio.current.currentTime = newValue;
          }}
        />
      </div>

      <span className="text-xs opacity-70 w-8 justify-self-end pl-2">
        {musicFormatTime(duration)}
      </span>
    </div>
  );
};

export const VolumeControl = () => {
  const volume = usePlayerStore((store) => store.volume);
  const setVolume = usePlayerStore((store) => store.setVolume);
  const previousVolumeRef = useRef(volume);

  const isVolumeSilence = volume < 0.1;

  const handleClickVolume = () => {
    if (!isVolumeSilence) {
      previousVolumeRef.current = volume;
      setVolume(0);
    } else {
      setVolume(previousVolumeRef.current);
    }
  };
  return (
    <div className="flex justify-center gap-x-2 fill-white cursor-pointer group">
      <button
        onClick={handleClickVolume}
        className="opacity-70 hover:opacity-100 transition active:animate-spin"
      >
        {isVolumeSilence ? <VolumeSilence /> : <Volume />}
      </button>
      <Slider
        defaultValue={[30]}
        max={100}
        min={0}
        step={1}
        value={[volume * 100]}
        className="w-[95px] touch-none select-none"
        onValueChange={(value) => {
          const [newVolume] = value;
          const volumeValue = newVolume / 100;
          setVolume(volumeValue);
        }}
      />
    </div>
  );
};

export const Player = () => {
  const { isPlaying, setPlaying, currentMusic, volume } = usePlayerStore(
    (state: Store) => state
  );
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleClick = async () => {
    setPlaying(!isPlaying);
  };

  useEffect(() => {
    if (audioRef.current) audioRef.current.src = "/music/1/01.mp3";
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    !isPlaying ? audioRef.current?.pause() : audioRef.current?.play();
  }, [isPlaying]);

  useEffect(() => {
    const { song, playlist }: Music = currentMusic;
    if (song) {
      const src = `/music/${playlist?.id.trim()}/0${song.id}.mp3`;
      if (audioRef.current) {
        audioRef.current.volume = volume;
        audioRef.current.src = src;
        audioRef.current.play();
      }
    }
  }, [currentMusic]);

  return (
    <div className="flex flex-row justify-between items-center w-full h-full z-50">
      <div className="min-w-96 pl-2">
        <CurrentSong
          title={currentMusic.song?.title}
          image={currentMusic.song?.image}
          artists={currentMusic.song?.artists}
        />
      </div>
      <div className="grid place-content-center flex-1 gap-4 justify-self-center">
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="flex gap-6">
            <button className="fill-slate-300">
              <ArrowLeft />
            </button>

            <button
              className="rounded-full bg-white p-2 hover:scale-105 duration-300"
              onClick={handleClick}
            >
              {isPlaying ? <Pause size="small" /> : <Play size="small" />}
            </button>

            <button className="fill-slate-300">
              <ArrowRight />
            </button>
          </div>
          <SongControl audio={audioRef} />
          <audio ref={audioRef}></audio>
        </div>
      </div>
      <div className="min-w-96 py-4 flex items-center justify-end pr-4">
        <VolumeControl />
      </div>
    </div>
  );
};
