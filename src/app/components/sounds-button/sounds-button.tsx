"use client";

import React from "react";
import { Howler } from "howler";
import Image from "next/image";

import styles from "./sounds-button.module.css";

export default function SoundsButton() {
  const [muted, setMuted] = React.useState(false);

  function toggleMute() {
    setMuted((prevMuted) => {
      const newMuted = !prevMuted;
      Howler.mute(newMuted);
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
      />
    </button>
  );
}
