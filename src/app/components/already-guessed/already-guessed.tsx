"use client";

import React from "react";
import styles from "./already-guessed.module.css";

interface AlreadyGuessedProps {
  userGuesses: string[];
}

export default function AlreadyGuessed({ userGuesses }: AlreadyGuessedProps) {
  const [guessedLetters, setGuessedLetters] = React.useState<string[]>([]);

  React.useEffect(() => {
    const uniqueLetters = Array.from(
      new Set(userGuesses.flatMap((guess) => guess.split("")))
    ).filter((letter) => letter !== " ");

    setGuessedLetters(uniqueLetters);
  }, [userGuesses]);

  return (
    <p className={styles.alreadyGuessed}>
      {guessedLetters.map((letter) => (
        <span key={letter}>
          {letter}
          <span className={styles.separator}>{" ✧ "}</span>
        </span>
      ))}
    </p>
  );
}
