"use client";

import React from "react";
import styles from "./phrase.module.css";
import { useHabitat } from "@/context/habitat-context-provider";
import { range } from "@/lib/rangeUtility";

interface PhraseProps {
  guessedLetters: string[];
}

export default function Phrase({ guessedLetters }: PhraseProps) {
  const { currentSpecies } = useHabitat();

  if (!currentSpecies) {
    return <div>Loading ...</div>;
  }

  // making a new variable because now it's guaranteed not null
  const species = currentSpecies;

  const phraseLength = currentSpecies.name.length;

  function isSpaceCharacter(charIndex: number): boolean {
    return species.name.charAt(charIndex) === " ";
  }

  function isGuessedCharacter(charIndex: number): boolean {
    const char = species.name.charAt(charIndex);
    return guessedLetters.includes(char);
  }

  return (
    <p className={styles.blank}>
      {range(phraseLength).map((num) => (
        <span key={num}>
          {/* \u00A0 means non-breaking space */}
          {isSpaceCharacter(num)
            ? "\u00A0 \u00A0"
            : isGuessedCharacter(num)
            ? species.name.charAt(num)
            : "_ "}
        </span>
      ))}
    </p>
  );
}
