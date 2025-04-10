"use client";

import React from "react";
import styles from "./on-screen-keyboard.module.css";
import { useHabitat } from "@/context/habitat-context-provider";
import { useAudio } from "@/context/audio-context-provider";
import { useIsSafari } from "@/hooks/use-is-safari";

interface OnScreenKeyboardProps {
  handleSubmitUserGuess: (inputGuess: string) => void;
  guessedLetters: string[];
}

export default function OnScreenKeyboard({
  handleSubmitUserGuess,
  guessedLetters,
}: OnScreenKeyboardProps) {
  const { playSound } = useAudio();
  const { habitats, currentHabitatIndex, currentSpeciesIndex } = useHabitat();

  const currentSpecies = habitats[currentHabitatIndex].species[currentSpeciesIndex];
  const speciesName = currentSpecies.name;
  const isSafari = useIsSafari();

  // Keep an internal state of guessed letters
  // To combat iOS persistent touch bug
  const [internalGuessedState, setInternalGuessedState] = React.useState<Record<string, boolean>>(
    {}
  );
  const [isProcessingTouch, setIsProcessingTouch] = React.useState(false);

  React.useEffect(() => {
    const newState: Record<string, boolean> = {};

    guessedLetters.forEach((letter) => {
      newState[letter] = true;
    });

    setInternalGuessedState(newState);
    setIsProcessingTouch(false);
  }, [guessedLetters]);

  const uniqueLetters = React.useMemo(() => {
    return new Set(speciesName.replace(/\s/g, ""));
  }, [speciesName]);

  function handleKeyPress(letter: string): void {
    if (isProcessingTouch) return;

    setIsProcessingTouch(true);

    if (internalGuessedState[letter]) {
      playSound("alreadyGuessed");
      return;
    } else if (speciesName.includes(letter)) {
      const currentCorrectGuesses = guessedLetters.filter((l) => uniqueLetters.has(l));

      if (currentCorrectGuesses.length + 1 === uniqueLetters.size) {
        playSound("speciesSolved");
      } else {
        playSound("correctLetter");
      }
    } else {
      playSound("incorrectLetter");
    }

    setInternalGuessedState((prev) => ({
      ...prev,
      [letter]: true,
    }));

    if (isSafari) {
      setTimeout(() => {
        handleSubmitUserGuess(letter);
      }, 50);
    } else {
      handleSubmitUserGuess(letter);
    }

    if (isSafari) {
      setTimeout(() => setIsProcessingTouch(false), 300);
    } else {
      setTimeout(() => setIsProcessingTouch(false), 150);
    }
  }

  const keyboardRows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  return (
    <div className={styles.keyboard}>
      {keyboardRows.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.keyboardRow}>
          {row.map((letter) => (
            <button
              key={letter}
              className={`${styles.key} ${internalGuessedState[letter] ? styles.guessed : ""}`}
              onClick={() => handleKeyPress(letter)}
              aria-label={`Letter ${letter}`}
              aria-pressed={internalGuessedState[letter] || false}
              onTouchEnd={(e) => {
                if (isSafari) {
                  e.preventDefault();
                }
              }}
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
