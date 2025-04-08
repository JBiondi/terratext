"use client";

import React from "react";
import styles from "./music-button.module.css";
import { useAudio } from "@/context/audio-context-provider";
import Image from "next/image";

interface CustomWindow extends Window {
  webkitAudioContext?: typeof AudioContext;
}

export default function MusicButton() {
  const {
    musicMuted,
    setMusicMuted,
    playBackgroundMusic,
    stopBackgroundMusic,

    audioContextRef,
    musicGainRef,
    soundFXGainRef,
    audioAnchorRef,
    soundBuffersRef,
    soundFXMuted,
    loadAllSounds,
    unlockIOSAudio,
  } = useAudio();

  async function toggleMute() {
    console.log("Music button clicked");

    // Special iOS handling
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    if (isIOS) {
      console.log("iOS device detected, using special audio unlocking");
      const unlocked = await unlockIOSAudio();
      console.log("iOS unlock attempt result:", unlocked);

      if (unlocked && audioContextRef.current) {
        if (!soundBuffersRef.current["backgroundMusic"]) {
          console.log("Loading sounds for iOS");
          await loadAllSounds();
        }

        setMusicMuted(false);
        playBackgroundMusic();
      }
      return;
    }

    // Initialize audio context synchronously
    if (!audioContextRef.current) {
      console.log("Creating AudioContext on music button press");
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
      soundFXGainNode.gain.value = soundFXMuted ? 0 : 1;
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

      // Need to set muted state first so background music plays when ready
      setMusicMuted(false);

      // Load sounds after context is created, THEN play music when ready
      loadAllSounds().then(() => {
        console.log("Sounds loaded, now playing background music");
        playBackgroundMusic();
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
    if (musicMuted) {
      setMusicMuted(false);
      playBackgroundMusic();
    } else {
      setMusicMuted(true);
      stopBackgroundMusic();
    }
  }

  return (
    <button
      className={styles.musicBtn}
      onClick={toggleMute}
      title={musicMuted ? "Unmute background music" : "Mute background music"}
    >
      <Image
        src={musicMuted ? "/images/ui/music-off-icon.png" : "/images/ui/music-on-icon.png"}
        alt={musicMuted ? "Unmute background music" : "Mute background music"}
        width={20}
        height={17}
        className={styles.musicBtnImage}
      />
    </button>
  );
}
