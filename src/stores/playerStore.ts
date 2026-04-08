import { create } from "zustand";

interface PlayerState {
  currentContentId: string | null;
  playing: boolean;
  volume: number;
  setCurrentContent: (id: string | null) => void;
  setPlaying: (playing: boolean) => void;
  setVolume: (volume: number) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentContentId: null,
  playing: false,
  volume: 1,
  setCurrentContent: (id) => set({ currentContentId: id }),
  setPlaying: (playing) => set({ playing }),
  setVolume: (volume) => set({ volume }),
}));
