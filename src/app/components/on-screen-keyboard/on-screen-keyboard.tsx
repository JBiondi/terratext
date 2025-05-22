"use client";

import React from "react";

import { useAudio } from "@/context/audio-context-provider";
import { useHabitat } from "@/context/habitat-context-provider";

import styles from "./on-screen-keyboard.module.css";

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

  const uniqueLetters = React.useMemo(() => {
    return new Set(speciesName.replace(/\s/g, ""));
  }, [speciesName]);

  function handleKeyPress(letter: string): void {
    if (guessedLetters.includes(letter)) {
      playSound("alreadyGuessed");
      return;
    }

    if (speciesName.includes(letter)) {
      const currentCorrectGuesses = guessedLetters.filter((l) => uniqueLetters.has(l));

      if (currentCorrectGuesses.length + 1 === uniqueLetters.size) {
        playSound("speciesSolved");
      } else {
        playSound("correctLetter");
      }
    } else {
      playSound("incorrectLetter");
    }

    handleSubmitUserGuess(letter);
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
              className={`${styles.key} ${
                guessedLetters.includes(letter)
                  ? uniqueLetters.has(letter)
                    ? styles.correctlyGuessed
                    : styles.incorrectlyGuessed
                  : ""
              }`}
              onClick={() => handleKeyPress(letter)}
              aria-label={`Letter ${letter}`}
              aria-pressed={guessedLetters.includes(letter) || false}
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
