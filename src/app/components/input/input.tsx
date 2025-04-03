"use client";

import React from "react";
import styles from "./input.module.css";
import { useHabitat } from "@/context/habitat-context-provider";
import { useSoundFX } from "@/context/sound-fx-context-provider";

interface InputProps {
  handleSubmitUserGuess: (inputGuess: string) => void;
  guessedLetters: string[];
}

export default function Input({ handleSubmitUserGuess, guessedLetters }: InputProps) {
  const [inputGuess, setInputGuess] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { playCorrectLetter, playIncorrectLetter, playAlreadyGuessed, playSpeciesSolved } =
    useSoundFX();
  const { habitats, currentHabitatIndex, currentSpeciesIndex } = useHabitat();
  const currentSpecies = habitats[currentHabitatIndex].species[currentSpeciesIndex];
  const speciesName = currentSpecies.name;

  // duplicated from phrase.tsx for now
  const uniqueLetters = React.useMemo(() => {
    // that regex removes spaces
    return new Set(speciesName.replace(/\s/g, ""));
  }, [speciesName]);

  // is this bad?
  const isMobile = typeof window !== "undefined" && /Mobi|Android/i.test(navigator.userAgent);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    // new variable from state variable for stability
    const guess = inputGuess;

    if (guessedLetters.includes(guess)) {
      playAlreadyGuessed();
    } else if (speciesName.includes(guess)) {
      const currentCorrectGuesses = guessedLetters.filter((letter) => uniqueLetters.has(letter));

      if (currentCorrectGuesses.length + 1 === uniqueLetters.size) {
        playSpeciesSolved();
      } else {
        playCorrectLetter();
      }
    } else {
      playIncorrectLetter();
    }

    handleSubmitUserGuess(guess);
    setInputGuess("");
    if (isMobile) {
      console.log('works on desktop inspect');
      inputRef.current?.blur();
    }    
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
        value={inputGuess}
        onChange={(event) => {
          setInputGuess(event.target.value.toUpperCase());
        }}
      />
    </form>
  );
}
