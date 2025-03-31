"use client";

import React from "react";
import styles from "./music-button.module.css";
import { useMusic } from "@/context/music-context-provider";
import Image from "next/image";

export default function MusicButton() {
  const { muted, setMuted } = useMusic();

  function toggleMute() {
    setMuted((prevMuted) => !prevMuted);
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
      />
    </button>
  );
}
