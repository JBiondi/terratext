"use client";

import React from "react";
import styles from "./input.module.css";
import useSound from "use-sound";
import { useHabitat } from "@/context/habitat-context-provider";

interface InputProps {
  handleSubmitUserGuess: (inputGuess: string) => void;
  guessedLetters: string[];
}

export default function Input({ handleSubmitUserGuess, guessedLetters }: InputProps) {
  const [inputGuess, setInputGuess] = React.useState("");
  const [playCorrectLetter] = useSound("/audio/correctLetterSound.mp3", { volume: 0.25 });
  const [playIncorrectLetter] = useSound("/audio/incorrectLetterSound.mp3", { volume: 1.25 });
  const [playSpeciesSolved] = useSound("/audio/speciesSolvedSound.mp3", { volume: 0.5 });
  const [playAlreadyGuessed] = useSound("/audio/alreadyGuessedSound.mp3", {
    volume: 5,
  });

  const { habitats, currentHabitatIndex, currentSpeciesIndex } = useHabitat();
  const currentSpecies = habitats[currentHabitatIndex].species[currentSpeciesIndex];
  const speciesName = currentSpecies.name;

  // duplicated from phrase.tsx for now
  const uniqueLetters = React.useMemo(() => {
    // that regex removes spaces
    return new Set(speciesName.replace(/\s/g, ""));
  }, [speciesName]);

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
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
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
