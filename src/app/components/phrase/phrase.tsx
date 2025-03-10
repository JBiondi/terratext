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
  const { habitats, currentHabitatIndex, currentSpeciesIndex, setCurrentSpeciesIndex } =
    useHabitat();

  const currentHabitat = habitats[currentHabitatIndex];
  const currentSpecies = currentHabitat.species[currentSpeciesIndex];
  const speciesName = currentSpecies.name;

  const uniqueLetters = React.useMemo(() => {
    // that regex removes spaces
    return new Set(speciesName.replace(/\s/g, ""));
  }, [speciesName]);

  React.useEffect(() => {
    if (!currentSpecies) return;

    const isSolved = [...uniqueLetters].every((letter) =>
      guessedLetters.includes(letter)
    );

    if (isSolved) {
      setBroadcastMsg("Congratulations, you got it!!");

      // this should be a button so the player can linger if they want
      setCurrentSpeciesIndex((prev) => prev + 1);
    }
  }, [
    guessedLetters,
    uniqueLetters,
    setBroadcastMsg,
    currentSpecies,
    setCurrentSpeciesIndex,
  ]);

  if (!currentSpecies) {
    return <div>Loading currentSpecies ...</div>;
  }

  const phraseLength = speciesName.length;

  function isSpaceCharacter(charIndex: number): boolean {
    return speciesName.charAt(charIndex) === " ";
  }

  function isGuessedCharacter(charIndex: number): boolean {
    return guessedLetters.includes(speciesName.charAt(charIndex));
  }

  return (
    <p className={styles.blank}>
      {range(phraseLength).map((num) => (
        <span key={num}>
          {/* \u00A0 means non-breaking space */}
          {isSpaceCharacter(num)
            ? "\u00A0 \u00A0"
            : isGuessedCharacter(num)
            ? speciesName.charAt(num)
            : "_ "}
        </span>
      ))}
    </p>
  );
}
