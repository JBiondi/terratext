"use client";

import React from "react";
import styles from "./phrase.module.css";
import { useHabitat } from "@/context/habitat-context-provider";
import { range } from "@/lib/range-utility";
import type { Species } from "@/types/types";
import type { ButtonState } from "@/types/types";

interface PhraseProps {
  guessedLetters: string[];
  setBroadcastMsg: React.Dispatch<React.SetStateAction<string>>;
  solvedSpecies: Species[];
  setSolvedSpecies: React.Dispatch<React.SetStateAction<Species[]>>;
  setButtonState: React.Dispatch<React.SetStateAction<ButtonState>>;
}

export default function Phrase({
  guessedLetters,
  setBroadcastMsg,
  solvedSpecies,
  setSolvedSpecies,
  setButtonState,
}: PhraseProps) {
  const { habitats, currentHabitatIndex, currentSpeciesIndex } = useHabitat();

  const currentHabitat = habitats[currentHabitatIndex];
  const currentSpecies = currentHabitat.species[currentSpeciesIndex];
  const speciesName = currentSpecies.name;
  const habitatName = habitats[currentHabitatIndex].name;

  const uniqueLetters = React.useMemo(() => {
    // that regex removes spaces
    return new Set(speciesName.replace(/\s/g, ""));
  }, [speciesName]);

  React.useEffect(() => {
    if (!currentSpecies) return;

    const isSolved = [...uniqueLetters].every((letter) => guessedLetters.includes(letter));

    if (isSolved) {
      setBroadcastMsg("Congratulations, you got it!!");
      setSolvedSpecies((prevSolvedSpecies) => [...prevSolvedSpecies, currentSpecies]);
      setButtonState({ time: true, action: "next species" });
    }
  }, [
    guessedLetters,
    uniqueLetters,
    setBroadcastMsg,
    currentSpecies,
    setSolvedSpecies,
    setButtonState,
  ]);

  React.useEffect(() => {
    if (!currentSpecies) return;

    if (solvedSpecies.length === currentHabitat.species.length) {
      setBroadcastMsg(`You found all the species in the ${habitatName} habitat! Amazing.`);
      setButtonState({ time: true, action: "next habitat" });
    }
  }, [
    solvedSpecies,
    habitatName,
    currentHabitat,
    currentSpecies,
    setButtonState,
    setBroadcastMsg,
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
