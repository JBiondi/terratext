"use client";

import React from "react";

interface AudioContextType {
  loadSound: (key: string, url: string) => Promise<void>;
  playSound: (key: string) => void;
  playBackgroundMusic: () => void;
  stopBackgroundMusic: () => void;
  musicMuted: boolean;
  setMusicMuted: React.Dispatch<React.SetStateAction<boolean>>;
  soundFXMuted: boolean;
  setSoundFXMuted: React.Dispatch<React.SetStateAction<boolean>>;
  resumeAudioContext: () => void;
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

  const [musicMuted, setMusicMuted] = React.useState(true);
  const [soundFXMuted, setSoundFXMuted] = React.useState(true);

  React.useEffect(() => {
    const AudioContextConstructor =
      window.AudioContext || (window as CustomWindow).webkitAudioContext;
    if (!AudioContextConstructor) {
      console.error("Web Audio API is not supported in this browser");
      return;
    }
    const ctx = new AudioContextConstructor();
    audioContextRef.current = ctx;

    const musicGainNode = ctx.createGain();
    musicGainNode.connect(ctx.destination);
    musicGainNode.gain.value = musicMuted ? 0 : 1;
    musicGainRef.current = musicGainNode;

    const soundFXGainNode = ctx.createGain();
    soundFXGainNode.connect(ctx.destination);
    soundFXGainNode.gain.value = soundFXMuted ? 0 : 1;
    soundFXGainRef.current = soundFXGainNode;

    // it's okay to ignore the deps warning here
  }, []);

  React.useEffect(() => {
    if (musicGainRef.current) {
      musicGainRef.current.gain.value = musicMuted ? 0 : 0.3;
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
    source.connect(soundFXGainRef.current);
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

  function resumeAudioContext() {
    if (audioContextRef.current && audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
      console.log("Audio context resumed");
    }
  }

  React.useEffect(() => {
    const loadAllSounds = async () => {
      await Promise.all([
        loadSound("correctLetter", "/audio/correct-letter-sound.mp3"),
        loadSound("incorrectLetter", "/audio/incorrect-letter-sound.mp3"),
        loadSound("alreadyGuessed", "/audio/already-guessed-sound.mp3"),
        loadSound("speciesSolved", "/audio/species-solved-sound.mp3"),
        loadSound("habitatSolved", "/audio/habitat-solved-sound.mp3"),
        loadSound("nextButtonClicked", "/audio/next-button-sound.mp3"),
        loadSound("backgroundMusic", "/audio/background-music.mp3"),
      ]);
    };

    if (audioContextRef.current) {
      loadAllSounds();
    }
  }, []);

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
  };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}

export function useAudio() {
  const context = React.useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioContextProvider");
  }
  return context;
}
