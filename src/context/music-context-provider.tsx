"use client";

import React from "react";
import useSound from "use-sound";
import { Howler } from "howler";

interface MusicContextType {
  playBackgroundMusic: () => void;
  stopBackgroundMusic: () => void;
  muted: boolean;
  setMuted: React.Dispatch<React.SetStateAction<boolean>>;
  resumeAudioContext: () => Promise<void>;
  isHowlerInitialized: boolean;
}

const MusicContext = React.createContext<MusicContextType | undefined>(undefined);

export function MusicContextProvider({ children }: { children: React.ReactNode }) {
  const [playBackgroundMusic, { stop: stopBackgroundMusic }] = useSound(
    "/audio/background-music.mp3",
    { volume: 0.1, loop: true }
  );
  const [muted, setMuted] = React.useState(true);
  const [isHowlerInitialized, setIsHowlerInitialized] = React.useState(false);

  // initialize Howler on mount to help with mobile audio rules
  React.useEffect(() => {
    const initializeHowler = async () => {
      if (Howler.ctx) {
        setIsHowlerInitialized(true);
        await resumeAudioContext();
        return;
      }

      // give it time to initialize before resuming audio context
      setTimeout(async () => {
        setIsHowlerInitialized(true);
        await resumeAudioContext();
      }, 50);
    };

    initializeHowler();
  }, []);

  React.useEffect(() => {
    const playOrStop = async () => {
      if (!isHowlerInitialized) {
        return;
      }

      if (muted) {
        stopBackgroundMusic();
      } else {
        if (Howler.ctx.state === "suspended") {
          await resumeAudioContext();
        }
        playBackgroundMusic();
      }
    };

    playOrStop();
  }, [muted, playBackgroundMusic, stopBackgroundMusic, isHowlerInitialized]);

  const resumeAudioContext = async () => {
    if (Howler.ctx && Howler.ctx.state === "suspended") {
      try {
        await Howler.ctx.resume();
        console.log("Audio context resumed:", Howler.ctx.state);
      } catch (error) {
        console.error("Error resuming audio context: ", error);
      }
    }
  };

  const value = { playBackgroundMusic, stopBackgroundMusic, muted, setMuted, resumeAudioContext, isHowlerInitialized };

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}

export function useMusic() {
  const context = React.useContext(MusicContext);

  if (!context) {
    throw new Error("useMusic must be used within a MusicContextProvider");
  }

  return context;
}
