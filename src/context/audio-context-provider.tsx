"use client";

import React from "react";
import AudioAnchor from "@/app/components/audio-anchor/audio-anchor";

interface AudioContextType {
  loadSound: (key: string, url: string) => Promise<void>;
  playSound: (key: string) => void;
  playBackgroundMusic: () => void;
  stopBackgroundMusic: () => void;
  musicMuted: boolean;
  setMusicMuted: React.Dispatch<React.SetStateAction<boolean>>;
  soundFXMuted: boolean;
  setSoundFXMuted: React.Dispatch<React.SetStateAction<boolean>>;
  resumeAudioContext: () => Promise<void>;
  audioContextRef: React.RefObject<AudioContext | null>;
  musicGainRef: React.RefObject<GainNode | null>;
  soundFXGainRef: React.RefObject<GainNode | null>;
  audioAnchorRef: React.RefObject<HTMLAudioElement | null>;
  soundBuffersRef: React.RefObject<{ [key: string]: AudioBuffer }>;
  loadAllSounds: () => Promise<void>;
  unlockIOSAudio: () => Promise<boolean>;
}

interface CustomWindow extends Window {
  webkitAudioContext?: typeof AudioContext;
}

const AudioContext = React.createContext<AudioContextType | undefined>(undefined);

export function AudioContextProvider({ children }: { children: React.ReactNode }) {
  const audioContextRef = React.useRef<AudioContext | null>(null);
  const musicGainRef = React.useRef<GainNode | null>(null);
  const soundFXGainRef = React.useRef<GainNode | null>(null);
  const soundBuffersRef = React.useRef<{ [key: string]: AudioBuffer }>({});
  const backgroundMusicRef = React.useRef<AudioBufferSourceNode | null>(null);
  const audioAnchorRef = React.useRef<HTMLAudioElement>(null);

  const [musicMuted, setMusicMuted] = React.useState(true);
  const [soundFXMuted, setSoundFXMuted] = React.useState(true);

  async function unlockIOSAudio() {
    const tempAudio = new Audio();

    // this src is intentionally super long
    tempAudio.src =
      "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAAbUAVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAAAAAAAAAAAAbUxWBJl//MUZAAAAsEALwAABngBgDAAAAsAAABYMEFBIEBQEBAQEAQBgMBAYD/+xBk/I/wAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xBkFo/wAAGkAAAAIAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";
    tempAudio.loop = true;
    tempAudio.autoplay = true;
    tempAudio.volume = 0;

    try {
      await tempAudio.play();
      console.log("iOS silent audio playing");

      if (!audioContextRef.current) {
        const AudioContextConstructor =
          window.AudioContext || (window as CustomWindow).webkitAudioContext;

        audioContextRef.current = new AudioContextConstructor();

        const musicGainNode = audioContextRef.current.createGain();
        musicGainNode.connect(audioContextRef.current.destination);
        musicGainNode.gain.value = musicMuted ? 0 : 0.15;
        musicGainRef.current = musicGainNode;

        const soundFXGainNode = audioContextRef.current.createGain();
        soundFXGainNode.connect(audioContextRef.current.destination);
        soundFXGainNode.gain.value = soundFXMuted ? 0 : 1;
        soundFXGainRef.current = soundFXGainNode;

        // Play a short oscillator to unlock WebAudio
        const oscillator = audioContextRef.current.createOscillator();
        oscillator.frequency.value = 440;
        oscillator.connect(audioContextRef.current.destination);
        oscillator.start(0);
        oscillator.stop(audioContextRef.current.currentTime + 0.01);
      }

      return true;
    } catch (err) {
      console.error("iOS audio unlock failed:", err);
      return false;
    }
  }

  React.useEffect(() => {
    if (musicGainRef.current) {
      musicGainRef.current.gain.value = musicMuted ? 0 : 0.2;
    }
  }, [musicMuted]);

  React.useEffect(() => {
    if (soundFXGainRef.current) {
      soundFXGainRef.current.gain.value = soundFXMuted ? 0 : 1;
    }
  }, [soundFXMuted]);

  async function loadSound(key: string, url: string) {
    if (!audioContextRef.current) return;
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
    soundBuffersRef.current[key] = audioBuffer;
  }

  function playSound(key: string) {
    if (!audioContextRef.current || !soundFXGainRef.current) return;
    const buffer = soundBuffersRef.current[key];
    if (!buffer) {
      console.warn(`Sound for key "${key}" not loaded.`);
      return;
    }
    const source = audioContextRef.current.createBufferSource();
    source.buffer = buffer;

    // TODO: refactor this
    if (key === "alreadyGuessed") {
      const agGain = audioContextRef.current.createGain();
      agGain.gain.value = soundFXMuted ? 0 : 2.75;
      source.connect(agGain);
      agGain.connect(audioContextRef.current.destination);
    } else if (key === "incorrectLetter") {
      const icLGain = audioContextRef.current.createGain();
      icLGain.gain.value = soundFXMuted ? 0 : 1.4;
      source.connect(icLGain);
      icLGain.connect(audioContextRef.current.destination);
    } else if (key === "correctLetter") {
      const cLGain = audioContextRef.current.createGain();
      cLGain.gain.value = soundFXMuted ? 0 : 0.4;
      source.connect(cLGain);
      cLGain.connect(audioContextRef.current.destination);
    } else if (key === "speciesSolved") {
      const ssGain = audioContextRef.current.createGain();
      ssGain.gain.value = soundFXMuted ? 0 : 0.4;
      source.connect(ssGain);
      ssGain.connect(audioContextRef.current.destination);
    }
    else {
      source.connect(soundFXGainRef.current);
    }

    source.start(0);
  }

  function playBackgroundMusic() {
    if (!audioContextRef.current || !musicGainRef.current) return;
    const buffer = soundBuffersRef.current["backgroundMusic"];
    if (!buffer) {
      console.warn("Background music not loaded.");
      return;
    }

    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.stop();
      backgroundMusicRef.current = null;
    }
    const source = audioContextRef.current.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    source.connect(musicGainRef.current);
    source.start(0);
    backgroundMusicRef.current = source;
  }

  function stopBackgroundMusic() {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.stop();
      backgroundMusicRef.current = null;
    }
  }

  async function resumeAudioContext() {
    if (!soundBuffersRef.current["backgroundMusic"]) {
      await loadAllSounds();
    }
  }

  async function loadAllSounds() {
    if (!audioContextRef.current) return;

    await Promise.all([
      loadSound("correctLetter", "/audio/correct-letter-sound.mp3"),
      loadSound("incorrectLetter", "/audio/incorrect-letter-sound.mp3"),
      loadSound("alreadyGuessed", "/audio/already-guessed-sound.mp3"),
      loadSound("speciesSolved", "/audio/species-solved-sound.mp3"),
      loadSound("habitatSolved", "/audio/habitat-solved-sound.mp3"),
      loadSound("buttonClicked", "/audio/button-sound.mp3"),
      loadSound("backgroundMusic", "/audio/background-music.mp3"),
    ]);
  }

  const value: AudioContextType = {
    loadSound,
    playSound,
    playBackgroundMusic,
    stopBackgroundMusic,
    musicMuted,
    setMusicMuted,
    soundFXMuted,
    setSoundFXMuted,
    resumeAudioContext,
    audioContextRef,
    musicGainRef,
    soundFXGainRef,
    audioAnchorRef,
    soundBuffersRef,
    loadAllSounds,
    unlockIOSAudio,
  };

  return (
    <>
      <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
      <AudioAnchor ref={audioAnchorRef} />
    </>
  );
}

export function useAudio() {
  const context = React.useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioContextProvider");
  }
  return context;
}
