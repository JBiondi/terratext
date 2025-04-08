"use client";

import React from "react";
import Image from "next/image";
import { useAudio } from "@/context/audio-context-provider";
import styles from "./sounds-button.module.css";

interface CustomWindow extends Window {
  webkitAudioContext?: typeof AudioContext;
}

export default function SoundsButton() {
  const {
    soundFXMuted,
    setSoundFXMuted,
    musicMuted,

    audioContextRef,
    musicGainRef,
    soundFXGainRef,
    audioAnchorRef,
    soundBuffersRef,
    loadAllSounds,
    unlockIOSAudio,
  } = useAudio();

  async function toggleMute() {
    console.log("Sounds button clicked");

    // Special iOS handling
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    if (isIOS) {
      console.log("iOS device detected, using special audio unlocking");
      const unlocked = await unlockIOSAudio();
      console.log("iOS unlock attempt result:", unlocked);

      if (unlocked && audioContextRef.current) {
        if (!soundBuffersRef.current["correctLetter"]) {
          console.log("Loading sounds for iOS");
          await loadAllSounds();
        }
        setSoundFXMuted(false);
      }
      return;
    }

    // Initialize audio context synchronously (non-iOS)
    if (!audioContextRef.current) {
      console.log("Creating AudioContext on sounds button press");
      const AudioContextConstructor =
        window.AudioContext || (window as CustomWindow).webkitAudioContext;

      // Create context within user gesture
      audioContextRef.current = new AudioContextConstructor();

      // Set up gain nodes immediately
      const musicGainNode = audioContextRef.current.createGain();
      musicGainNode.connect(audioContextRef.current.destination);
      musicGainNode.gain.value = musicMuted ? 0 : 0.3;
      musicGainRef.current = musicGainNode;

      const soundFXGainNode = audioContextRef.current.createGain();
      soundFXGainNode.connect(audioContextRef.current.destination);
      soundFXGainNode.gain.value = false ? 0 : 1; // Always enable sounds when initializing
      soundFXGainRef.current = soundFXGainNode;

      // Play silent buffer synchronously to unlock audio
      const buffer = audioContextRef.current.createBuffer(1, 1, 22050);
      const source = audioContextRef.current.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContextRef.current.destination);
      source.start(0);
      console.log("Played silent buffer");

      // Also trigger audio element
      if (audioAnchorRef.current) {
        audioAnchorRef.current.play().catch((e) => console.log("Audio anchor error:", e));
      }

      // Set sound FX to enabled
      setSoundFXMuted(false);

      // Load sounds after context is created
      loadAllSounds().then(() => {
        console.log("Sounds loaded successfully");
      });

      // Early return to prevent the code below from executing
      return;
    }

    // Resume context if suspended
    if (audioContextRef.current && audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
      console.log("Resumed audio context, state:", audioContextRef.current.state);
    }

    // Toggle mute state for EXISTING audio context
    setSoundFXMuted((prevSoundFXMuted) => !prevSoundFXMuted);
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
