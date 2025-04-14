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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    // new variable from state variable for stability
    const guess = inputGuess;

    if (guessedLetters.includes(guess)) {
      playSound("alreadyGuessed");
    } else if (speciesName.includes(guess)) {
      const currentCorrectGuesses = guessedLetters.filter((letter) => uniqueLetters.has(letter));

      if (currentCorrectGuesses.length + 1 === uniqueLetters.size) {
        playSound("speciesSolved");
      } else {
        playSound("correctLetter");
      }
    } else {
      playSound("incorrectLetter");
    }

    handleSubmitUserGuess(guess);
    setInputGuess("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        placeholder="Guess a letter"
        className={styles.input}
        id="input-guess"
        aria-label="Guess a letter"
        required
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
        onChange={(event) => {          
          setInputGuess(event.target.value.toUpperCase());
        }}
      />
    </form>
  );
}
