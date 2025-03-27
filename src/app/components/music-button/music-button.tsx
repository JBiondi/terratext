"use client";

import React from "react";
import styles from "./music-button.module.css";
import { useMusic } from "@/context/music-context-provider";
import Image from "next/image";

export default function MusicButton() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const { playBackgroundMusic, stopBackgroundMusic } = useMusic();

  function toggleIsPlaying() {
    setIsPlaying((prevIsPlaying) => {
      const newIsPlaying = !prevIsPlaying;
      if (newIsPlaying) {
        playBackgroundMusic();
      } else {
        stopBackgroundMusic();
      }

      return newIsPlaying;
    });
  }

  return (
    <button
      className={styles.musicBtn}
      onClick={toggleIsPlaying}
      title={isPlaying ? "Mute background music" : "Unmute background music"}
    >
      <Image
        src={isPlaying ? "/images/ui/music-on-icon.png" : "/images/ui/music-off-icon.png"}
        alt={isPlaying ? "mute" : "unmute"}
        width={20}
        height={17}
      />
    </button>
  );
}
