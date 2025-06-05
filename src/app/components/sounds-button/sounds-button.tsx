"use client";

import Image from "next/image";
import React from "react";

import { useAudio } from "@/context/audio-context-provider";
import { isIOSDevice } from "@/lib/is-ios-device-utility";

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

  // There's so much logic in here that was originally in the AudioContext
  // Because it needs to be as close to the user event as possible for iOS audio
  async function toggleMute() {
    const isIOS = isIOSDevice();

    if (isIOS) {
      if (audioContextRef.current) {
        if (!soundFXMuted) {
          setSoundFXMuted(true);
          return;
        }
      }

      const unlocked = await unlockIOSAudio();

      if (unlocked && audioContextRef.current) {
        if (!soundBuffersRef.current["correctLetter"]) {
          await loadAllSounds();
        }
        setSoundFXMuted(false);
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
      soundFXGainNode.gain.value = false ? 0 : 1;
      soundFXGainRef.current = soundFXGainNode;

      const buffer = audioContextRef.current.createBuffer(1, 1, 22050);
      const source = audioContextRef.current.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContextRef.current.destination);
      source.start(0);

      if (audioAnchorRef.current) {
        audioAnchorRef.current.play().catch((e) => console.log("Audio anchor error:", e));
      }

      setSoundFXMuted(false);

      loadAllSounds().then(() => {
        console.log("Sounds loaded successfully");
      });

      return;
    }

    if (audioContextRef.current && audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }

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
