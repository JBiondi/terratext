"use client";

import React from "react";
import styles from "./audio-anchor.module.css";

// Experimenting with a hidden 1 second silent audio element 
// to anchor the audio session on iOS
function AudioAnchor(
  props: React.HTMLAttributes<HTMLAudioElement>,
  ref: React.Ref<HTMLAudioElement>
) {
  return (
    <audio
      className={styles.audioAnchor}
      ref={ref}
      src="/audio/silence.mp3"
      preload="auto"
      playsInline
      muted
      {...props}
    />
  );
}

export default React.forwardRef<HTMLAudioElement, React.HTMLAttributes<HTMLAudioElement>>(
  AudioAnchor
);
