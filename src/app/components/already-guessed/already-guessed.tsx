"use client";

import React from "react";
import styles from "./already-guessed.module.css";

interface AlreadyGuessedProps {
  guessedLetters: string[];
}

export default function AlreadyGuessed({ guessedLetters }: AlreadyGuessedProps) {  

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
