"use client";

import React from "react";
import styles from "./music-button.module.css";
import { useAudio } from "@/context/audio-context-provider";
import Image from "next/image";

export default function MusicButton() {
  const { musicMuted, setMusicMuted, playBackgroundMusic, stopBackgroundMusic } = useAudio();

  function toggleMute() {
    if (musicMuted) {
      setMusicMuted(false);
      playBackgroundMusic();
    } else {
      setMusicMuted(true);
      stopBackgroundMusic();
    }
  }

  return (
    <button
      className={styles.musicBtn}
      onClick={toggleMute}
      title={musicMuted ? "Unmute background music" : "Mute background music"}
    >
      <Image
        src={musicMuted ? "/images/ui/music-off-icon.png" : "/images/ui/music-on-icon.png"}
        alt={musicMuted ? "Unmute background music" : "Mute background music"}
        width={20}
        height={17}
        className={styles.musicBtnImage}
      />
    </button>
  );
}
