"use client";

import React from "react";
import styles from "./phrase.module.css";
import { useHabitat } from "@/context/habitat-context-provider";
import { range } from "@/lib/range-utility";

interface PhraseProps {
  guessedLetters: string[];
  setBroadcastMsg: React.Dispatch<React.SetStateAction<string>>;
}

export default function Phrase({ guessedLetters, setBroadcastMsg }: PhraseProps) {
  const { currentSpecies } = useHabitat();
  const speciesName = currentSpecies ? currentSpecies.name : "";

  const uniqueLetters = React.useMemo(() => {
    // that regex gets rid of spaces
    return new Set(speciesName.replace(/\s/g, ""));
  }, [speciesName]);

  React.useEffect(() => {
    if (!currentSpecies) return;

    const isSolved = [...uniqueLetters].every((letter) =>
      guessedLetters.includes(letter)
    );

    if (isSolved) {
      setBroadcastMsg("Congratulations, you got it!!");
    }
  }, [guessedLetters, uniqueLetters, setBroadcastMsg, currentSpecies]);

  if (!currentSpecies) {
    return <div>Loading ...</div>;
  }

  // making a new species variable because now it's guaranteed not null
  // TODO revisit this and make sure it's not a bad pattern
  const species = currentSpecies;
  const phraseLength = species.name.length;

  function isSpaceCharacter(charIndex: number): boolean {
    return species.name.charAt(charIndex) === " ";
  }

  function isGuessedCharacter(charIndex: number): boolean {
    return guessedLetters.includes(species.name.charAt(charIndex));
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
