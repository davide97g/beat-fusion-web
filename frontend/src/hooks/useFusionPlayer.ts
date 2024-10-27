import { playInterval, runInOrder, stopCurrentSong } from "@/services/player";
import { useState } from "react";

export const useFusionPlayer = (
  config: Readonly<{ songId: string; start: number; end: number }[]>,
) => {
  const players = config.map((item) => () => playInterval(item));
  const [isPlaying, setIsPlaying] = useState(false);
  const playFusion = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    runInOrder(players)
      .catch(console.error)
      .finally(() => setIsPlaying(false));
  };

  const stop = () => {
    stopCurrentSong();
    setIsPlaying(false);
  }; // use abort controller
  const restart = () => {
    stop();
    playFusion();
  };
  return { playFusion, stop, restart, isPlaying };
};
