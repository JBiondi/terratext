"use client";

import React from "react";
import styles from "./on-screen-keyboard.module.css";
import { useHabitat } from "@/context/habitat-context-provider";
import { useAudio } from "@/context/audio-context-provider";

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

  // Keep an internal state of guessed letters
  // To combat iOS persistent touch bug
  const [internalGuessedState, setInternalGuessedState] = React.useState<Record<string, boolean>>(
    {}
  );

  React.useEffect(() => {
    const newState: Record<string, boolean> = {};

    guessedLetters.forEach((letter) => {
      newState[letter] = true;
    });

    setInternalGuessedState(newState);
  }, [guessedLetters]);

  React.useEffect(() => {
    setTimeout(() => {
      const allKeys = document.querySelectorAll(`.${styles.key}`);
      allKeys.forEach((key) => {
        if (!guessedLetters.includes(key.textContent || "")) {
          key.classList.remove(styles.guessed);
        }
      });
    }, 0);
  }, [guessedLetters]);

  const uniqueLetters = React.useMemo(() => {
    return new Set(speciesName.replace(/\s/g, ""));
  }, [speciesName]);

  function handleKeyPress(letter: string): void {
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
              className={`${styles.key} ${internalGuessedState[letter] ? styles.guessed : ""}`}
              onClick={() => handleKeyPress(letter)}
              aria-label={`Letter ${letter}`}
              aria-pressed={internalGuessedState[letter] || false}
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
