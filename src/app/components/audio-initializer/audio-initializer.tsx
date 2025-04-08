"use client";
import { useEffect, useState } from "react";
import styles from "./audio-initializer.module.css";
import { useAudio } from "@/context/audio-context-provider";

export default function AudioInitializer() {
  const [showOverlay, setShowOverlay] = useState(false);
  const { unlockIOSAudio, loadAllSounds } = useAudio();
  
  useEffect(() => {
    // Only show on iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    
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
        <p>iOS requires a tap to enable audio playback</p>
        <button className={styles.button}>Tap Here</button>
      </div>
    </div>
  );
}