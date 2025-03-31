"use client";

import React from "react";
import useSound from "use-sound";

interface MusicContextType {
  playBackgroundMusic: () => void;
  stopBackgroundMusic: () => void;
  muted: boolean;
  setMuted: React.Dispatch<React.SetStateAction<boolean>>;
}

const MusicContext = React.createContext<MusicContextType | undefined>(undefined);

export function MusicContextProvider({ children }: { children: React.ReactNode }) {
  const [playBackgroundMusic, { stop: stopBackgroundMusic }] = useSound(
    "/audio/background-music.mp3",
    { volume: 0.1, loop: true }
  );
  const [muted, setMuted] = React.useState(true);

  React.useEffect(() => {
    if (muted) {
      stopBackgroundMusic();
    } else {
      playBackgroundMusic();
    }
  }, [muted, playBackgroundMusic, stopBackgroundMusic]);

  const value = { playBackgroundMusic, stopBackgroundMusic, muted, setMuted };

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}

export function useMusic() {
  const context = React.useContext(MusicContext);

  if (!context) {
    throw new Error("useMusic must be used within a MusicContextProvider");
  }

  return context;
}
