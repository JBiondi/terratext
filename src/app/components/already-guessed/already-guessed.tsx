"use client";

import React from "react";
import styles from "./already-guessed.module.css";

interface AlreadyGuessedProps {
  guessedLetters: string[];
  animateGuess: string | null;
}

export default function AlreadyGuessed({ guessedLetters, animateGuess }: AlreadyGuessedProps) {
  return (
    <p className={styles.alreadyGuessed}>
      <span className={styles.agLabel}>Guessed letters:</span>
      {guessedLetters.length > 0 && <span className={styles.separator}>{" ✧ "}</span>}
      {guessedLetters.map((letter) => (
        <span key={letter}>
          <span className={animateGuess === letter ? styles.sparkle : ""}>{letter}</span>
          <span className={styles.separator}>{" ✧ "}</span>
        </span>
      ))}
    </p>
  );
}
