"use client";

import React from "react";
import styles from "./input.module.css";
import { useHabitat } from "@/context/habitat-context-provider";
import { useAudio } from "@/context/audio-context-provider";

interface InputProps {
  handleSubmitUserGuess: (inputGuess: string) => void;
  guessedLetters: string[];
}

export default function Input({ handleSubmitUserGuess, guessedLetters }: InputProps) {
  const [inputGuess, setInputGuess] = React.useState("");
  const [placeholder, setPlaceholder] = React.useState("Guess a letter");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { playSound } = useAudio();
  const { habitats, currentHabitatIndex, currentSpeciesIndex } = useHabitat();
  const currentSpecies = habitats[currentHabitatIndex].species[currentSpeciesIndex];
  const speciesName = currentSpecies.name;

  // duplicated from phrase.tsx for now
  const uniqueLetters = React.useMemo(() => {
    // that bit of regex removes spaces
    return new Set(speciesName.replace(/\s/g, ""));
  }, [speciesName]);

  function handleLetterInput(event: React.ChangeEvent<HTMLInputElement>): void {
    const letter = event.target.value.toUpperCase();

    setInputGuess(letter);

    if (letter.match(/^[A-Z]$/)) {
      if (guessedLetters.includes(letter)) {
        playSound("alreadyGuessed");
      } else if (speciesName.includes(letter)) {
        const currentCorrectGuesses = guessedLetters.filter((ltr) => uniqueLetters.has(ltr));

        if (currentCorrectGuesses.length + 1 === uniqueLetters.size) {
          playSound("speciesSolved");
        } else {
          playSound("correctLetter");
        }
      } else {
        playSound("incorrectLetter");
      }

      handleSubmitUserGuess(letter);

      // delay for user to see their typed letter
      setTimeout(() => {
        setInputGuess("");
      }, 100);
    } else if (letter) {
      setPlaceholder("Letters only");

      setTimeout(() => {
        setInputGuess("");

        setTimeout(() => {
          setPlaceholder("Guess a letter");
        }, 800);
      }, 150);
    }
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        ref={inputRef}
        placeholder={placeholder}
        className={styles.input}
        id="input-guess"
        aria-label="Guess a letter"
        autoFocus
        maxLength={1}
        type="text"
        pattern="[A-Za-z]"
        inputMode="text"
        onInvalid={(e) => {
          (e.target as HTMLInputElement).setCustomValidity("Enter a letter (A-Z)");
        }}
        onInput={(e) => {
          (e.target as HTMLInputElement).setCustomValidity("");
        }}
        value={inputGuess}
        onChange={handleLetterInput}
      />
    </form>
  );
}
