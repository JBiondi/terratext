"use client";
import React from "react";
import styles from "./audio-initializer.module.css";
import { useAudio } from "@/context/audio-context-provider";
import { isIOSDevice } from "@/lib/is-ios-device-utility";

export default function AudioInitializer() {
  const [showOverlay, setShowOverlay] = React.useState(false);
  const { unlockIOSAudio, loadAllSounds } = useAudio();
  
  React.useEffect(() => {
    const isIOS = isIOSDevice();
    
    if (isIOS) {
      setShowOverlay(true);
    }
  }, []);
  
  async function handleActivate() {
    console.log("Audio initializer clicked");
    const unlocked = await unlockIOSAudio();
    console.log("Initializer unlock attempt result:", unlocked);
    
    if (unlocked) {
      await loadAllSounds();
      setShowOverlay(false);
    }
  }
  
  if (!showOverlay) return null;
  
  return (
    <div className={styles.overlay} onClick={handleActivate}>
      <div className={styles.container}>
        <h2>Tap to Enable Audio</h2>
        <p>iOS requires a tap to enable audio.</p>
        <p>Playback remains muted by default.</p>
        <button className={styles.button}>Tap Here</button>
      </div>
    </div>
  );
}