"use client";

import React from "react";
import { useSoundFX } from "@/context/sound-fx-context-provider";
import Image from "next/image";

import styles from "./sounds-button.module.css";

export default function SoundsButton() {
  const { muted, setMuted, resumeAudioContext } = useSoundFX();

  async function toggleMute() {
    if (muted) {
      try {
        await resumeAudioContext();
      } catch (error) {
        console.error("Error resuming audio context in SoundsButton", error);
      }      
    }
    setMuted((prevMuted) => {
      const newMuted = !prevMuted;
      return newMuted;
    });
  }

  return (
    <button
      className={styles.muteSoundsBtn}
      onClick={toggleMute}
      title={muted ? "Unmute sound effects" : "Mute sound effects"}
    >
      <Image
        src={muted ? "/images/ui/volume-off-icon.png" : "/images/ui/volume-up-icon.png"}
        alt={muted ? "Unmute sound effects" : "Mute sound effects"}
        width={20}
        height={17}
        className={styles.muteSoundsBtnImage}
      />
    </button>
  );
}
