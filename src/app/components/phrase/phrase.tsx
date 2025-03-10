"use client";

import React from "react";
import styles from "./phrase.module.css";
import { useHabitat } from "@/context/habitat-context-provider";
import { range } from "@/lib/range-utility";
import type { Species } from "@/types/habitat-types";

interface PhraseProps {
  guessedLetters: string[];
  setBroadcastMsg: React.Dispatch<React.SetStateAction<string>>;
  setSolvedSpecies: React.Dispatch<React.SetStateAction<Species[]>>;
  setButtonTime: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Phrase({
  guessedLetters,
  setBroadcastMsg,
  setSolvedSpecies,
  setButtonTime,
}: PhraseProps) {

  const { habitats, currentHabitatIndex, currentSpeciesIndex } = useHabitat();
  
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
      setSolvedSpecies((prevSolvedSpecies) => [...prevSolvedSpecies, currentSpecies]);
      setButtonTime(true);
    }
  }, [
    guessedLetters,
    uniqueLetters,
    setBroadcastMsg,
    currentSpecies,
    setSolvedSpecies,
    setButtonTime,
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
            ? "\u00A0 "
            : isGuessedCharacter(num)
            ? `${speciesName.charAt(num)} `
            : "_ "}
        </span>
      ))}
    </p>
  );
}
