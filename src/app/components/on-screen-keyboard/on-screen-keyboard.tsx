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
  const [internalGuessedState, setInternalGuessedState] = React.useState<Record<string, boolean>>(
    {}
  );

  const { playSound } = useAudio();
  const { habitats, currentHabitatIndex, currentSpeciesIndex } = useHabitat();

  const currentSpecies = habitats[currentHabitatIndex].species[currentSpeciesIndex];
  const speciesName = currentSpecies.name;
  const isSafari = useIsSafari();

  const processingKeysRef = React.useRef<Set<string>>(new Set());

  React.useEffect(() => {
    const newState: Record<string, boolean> = {};

    guessedLetters.forEach((letter) => {
      newState[letter] = true;
    });

    setInternalGuessedState(newState);
    processingKeysRef.current = new Set();
  }, [guessedLetters]);

  const uniqueLetters = React.useMemo(() => {
    return new Set(speciesName.replace(/\s/g, ""));
  }, [speciesName]);

  function handleKeyPress(letter: string): void {
    if (processingKeysRef.current.has(letter)) return;

    processingKeysRef.current.add(letter);

    if (internalGuessedState[letter]) {
      playSound("alreadyGuessed");

      setTimeout(() => {
        processingKeysRef.current.delete(letter);
      }, 100);
      return;
    }

    setInternalGuessedState((prev) => ({
      ...prev,
      [letter]: true,
    }));

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

    const releaseTime = isSafari ? 300 : 150;
    setTimeout(() => {
      processingKeysRef.current.delete(letter);
    }, releaseTime);
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
