"use client";

import React from "react";
import Image from "next/image";
import { useAudio } from "@/context/audio-context-provider";
import styles from "./sounds-button.module.css";

export default function SoundsButton() {
  const { soundFXMuted, setSoundFXMuted } = useAudio();

  function toggleMute() {
    setSoundFXMuted((prevSoundFXMuted) => {
      const newSoundFXMuted = !prevSoundFXMuted;
      return newSoundFXMuted;
    });
  }

  return (
    <button
      className={styles.muteSoundsBtn}
      onClick={toggleMute}
      title={soundFXMuted ? "Unmute sound effects" : "Mute sound effects"}
    >
      <Image
        src={soundFXMuted ? "/images/ui/volume-off-icon.png" : "/images/ui/volume-up-icon.png"}
        alt={soundFXMuted ? "Unmute sound effects" : "Mute sound effects"}
        width={20}
        height={17}
        className={styles.muteSoundsBtnImage}
      />
    </button>
  );
}
