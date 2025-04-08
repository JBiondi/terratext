"use client";

import React from "react";
import styles from "./music-button.module.css";
import { useAudio } from "@/context/audio-context-provider";
import { isIOSDevice } from "@/lib/is-ios-device-utility";
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

  // There's so much logic in here that was originally in the AudioContext because
  // it needs to be as close to the user event as possible for iOS audio
  async function toggleMute() {
    const isIOS = isIOSDevice();

    if (isIOS) {
      if (audioContextRef.current) {
        if (!musicMuted) {
          setMusicMuted(true);
          stopBackgroundMusic();
          return;
        }
      }

      const unlocked = await unlockIOSAudio();

      if (unlocked && audioContextRef.current) {
        if (!soundBuffersRef.current["backgroundMusic"]) {
          await loadAllSounds();
        }
        setMusicMuted(false);
        playBackgroundMusic();
      }
      return;
    }

    if (!audioContextRef.current) {
      const AudioContextConstructor =
        window.AudioContext || (window as CustomWindow).webkitAudioContext;

      audioContextRef.current = new AudioContextConstructor();

      const musicGainNode = audioContextRef.current.createGain();
      musicGainNode.connect(audioContextRef.current.destination);
      musicGainNode.gain.value = musicMuted ? 0 : 0.3;
      musicGainRef.current = musicGainNode;

      const soundFXGainNode = audioContextRef.current.createGain();
      soundFXGainNode.connect(audioContextRef.current.destination);
      soundFXGainNode.gain.value = soundFXMuted ? 0 : 1;
      soundFXGainRef.current = soundFXGainNode;

      const buffer = audioContextRef.current.createBuffer(1, 1, 22050);
      const source = audioContextRef.current.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContextRef.current.destination);
      source.start(0);

      if (audioAnchorRef.current) {
        audioAnchorRef.current.play().catch((e) => console.log("Audio anchor error:", e));
      }

      setMusicMuted(false);

      loadAllSounds().then(() => {
        playBackgroundMusic();
      });

      return;
    }

    if (audioContextRef.current && audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }

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
