"use client";

import React from "react";
import styles from "./music-button.module.css";
import { useMusic } from "@/context/music-context-provider";
import Image from "next/image";

export default function MusicButton() {
  const { muted, setMuted, resumeAudioContext, playBackgroundMusic, stopBackgroundMusic } =
    useMusic();

  function toggleMute() {
    if (muted) {
      resumeAudioContext();
      setMuted(false);
      playBackgroundMusic();
    } else {
      setMuted(true);
      stopBackgroundMusic();
    }
  }

  return (
    <button
      className={styles.musicBtn}
      onClick={toggleMute}
      title={muted ? "Unmute background music" : "Mute background music"}
    >
      <Image
        src={muted ? "/images/ui/music-off-icon.png" : "/images/ui/music-on-icon.png"}
        alt={muted ? "unmute" : "mute"}
        width={20}
        height={17}
        className={styles.musicBtnImage}
      />
    </button>
  );
}
