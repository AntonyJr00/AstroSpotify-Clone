import type { Song } from "@/lib/data";
import { create } from "zustand";

//* Modelos___________
export interface Music {
  playlist: {
    id: string;
  } | null;
  song: Song | null;
  songs: Song[];
}

export interface Store {
  isPlaying: boolean;
  currentMusic: Music;
  volume: number;

  setVolume: (volume: number) => void;
  setPlaying: (isPlaying: boolean) => void;
  setCurrentMusic: (currentMusic: Music) => void;
}
//* Modelos___________

export const usePlayerStore = create<Store>()((set) => ({
  currentMusic: { playlist: null, song: null, songs: [] },
  isPlaying: false,
  volume: 0.3,

  setCurrentMusic: (currentMusic: Music) => set({ currentMusic: currentMusic }),
  setPlaying: (isPlaying: boolean) => set({ isPlaying: isPlaying }),
  setVolume: (volume: number) => set({ volume }),
}));
