"use client";

import React from "react";
import useSound from "use-sound";

interface SoundFXContextType {
  playCorrectLetter: () => void;
  playIncorrectLetter: () => void;
  playAlreadyGuessed: () => void;
  playSpeciesSolved: () => void;
  playHabitatSolved: () => void;
  playNextButtonClicked: () => void;
  muted: boolean;
  setMuted: React.Dispatch<React.SetStateAction<boolean>>;
}

const SoundFXContext = React.createContext<SoundFXContextType | undefined>(undefined);

export function SoundFXProvider({ children }: { children: React.ReactNode }) {
  const [muted, setMuted] = React.useState(false);

  // They all have { sound: name } so that each call to useSound returns
  // an object with a Howl instance which the useEffect below can watch
  // for changes in order to avoid stale muted state
  const [playCorrectLetter, { sound: correctLetterSound }] = useSound(
    "/audio/correct-letter-sound.mp3",
    {
      volume: 0.25,
    }
  );
  const [playIncorrectLetter, { sound: incorrectLetterSound }] = useSound(
    "/audio/incorrect-letter-sound.mp3",
    {
      volume: 1.25,
    }
  );
  const [playAlreadyGuessed, { sound: alreadyGuessedSound }] = useSound(
    "/audio/already-guessed-sound.mp3",
    {
      volume: 5,
    }
  );
  const [playSpeciesSolved, { sound: speciesSolvedSound }] = useSound(
    "/audio/species-solved-sound.mp3",
    {
      volume: 0.5,
    }
  );
  const [playHabitatSolved, { sound: habitatSolvedSound }] = useSound(
    "/audio/habitat-solved-sound.mp3",
    {
      volume: 0.5,
    }
  );
  const [playNextButtonClicked, { sound: nextButtonClickedSound }] = useSound(
    "/audio/next-button-sound.mp3",
    {
      volume: 0.85,
      playbackRate: 1.5,
    }
  );

  // This useEffect is watching the Howl instances for changes
  // Tried adding a mute condition to the useSound calls above but it relied on stale muted state
  React.useEffect(() => {
    // Prevent bugs caused by sounds still playing
    if (!muted) {
      if (correctLetterSound) correctLetterSound.stop();
      if (incorrectLetterSound) incorrectLetterSound.stop();
      if (alreadyGuessedSound) alreadyGuessedSound.stop();
      if (speciesSolvedSound) speciesSolvedSound.stop();
      if (habitatSolvedSound) habitatSolvedSound.stop();
      if (nextButtonClickedSound) nextButtonClickedSound.stop();
    }

    if (correctLetterSound) correctLetterSound.volume(muted ? 0 : 0.25);
    if (incorrectLetterSound) incorrectLetterSound.volume(muted ? 0 : 1);
    if (alreadyGuessedSound) alreadyGuessedSound.volume(muted ? 0 : 1);
    if (speciesSolvedSound) speciesSolvedSound.volume(muted ? 0 : 0.5);
    if (habitatSolvedSound) habitatSolvedSound.volume(muted ? 0 : 0.5);
    if (nextButtonClickedSound) nextButtonClickedSound.volume(muted ? 0 : 0.85);
  }, [
    muted,
    correctLetterSound,
    incorrectLetterSound,
    alreadyGuessedSound,
    speciesSolvedSound,
    habitatSolvedSound,
    nextButtonClickedSound,
  ]);

  const value = {
    playCorrectLetter,
    playIncorrectLetter,
    playAlreadyGuessed,
    playSpeciesSolved,
    playHabitatSolved,
    playNextButtonClicked,
    muted,
    setMuted,
  };

  return <SoundFXContext.Provider value={value}>{children}</SoundFXContext.Provider>;
}

export function useSoundFX() {
  const context = React.useContext(SoundFXContext);

  if (!context) {
    throw new Error("useSoundFX must be used within a SoundFXProvider");
  }

  return context;
}
