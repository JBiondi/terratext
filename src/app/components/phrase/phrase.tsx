"use client";

import React from "react";
import styles from "./phrase.module.css";
import { useHabitat } from "@/context/habitat-context-provider";
import { useAudio } from "@/context/audio-context-provider";
import { range } from "@/lib/range-utility";
import usePhraseAnimation from "@/hooks/use-phrase-animation";
import Celebration from "../celebration/celebration";
import type { Species } from "@/types/types";
import type { ButtonState } from "@/types/types";

interface PhraseProps {
  guessedLetters: string[];
  setBroadcastMsg: React.Dispatch<React.SetStateAction<string>>;
  solvedSpecies: Species[];
  setSolvedSpecies: React.Dispatch<React.SetStateAction<Species[]>>;
  setButtonState: React.Dispatch<React.SetStateAction<ButtonState>>;
  animateGuess: string | null;
}

export default function Phrase({
  guessedLetters,
  setBroadcastMsg,
  solvedSpecies,
  setSolvedSpecies,
  setButtonState,
  animateGuess,
}: PhraseProps) {
  const { habitats, currentHabitatIndex, currentSpeciesIndex } = useHabitat();

  const currentHabitat = habitats[currentHabitatIndex];
  const currentSpecies = currentHabitat.species[currentSpeciesIndex];
  const speciesName = currentSpecies.name;
  const habitatName = habitats[currentHabitatIndex].name;
  const newlySolvedIndices = usePhraseAnimation(speciesName, guessedLetters, 400);

  const { playSound } = useAudio();

  const uniqueLetters = React.useMemo(() => {
    // that regex removes spaces
    return new Set(speciesName.replace(/\s/g, ""));
  }, [speciesName]);

  React.useEffect(() => {
    if (!currentSpecies) return;

    const isSolved = [...uniqueLetters].every((letter) => guessedLetters.includes(letter));

    if (isSolved) {
      setBroadcastMsg("Congratulations, you got it!!!");
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
      if (currentHabitatIndex === habitats.length - 1) {
        playSound("habitatSolved");
        setBroadcastMsg(`You solved every habitat! You beat the game ♡`);
        setButtonState({ time: true, action: "restart game" });
      } else {
        playSound("habitatSolved");
        setBroadcastMsg(`You found all the species in the ${habitatName} habitat! Amazing.`);
        setButtonState({ time: true, action: "next habitat" });
      }
    }
  }, [
    solvedSpecies,
    habitats,
    habitatName,
    currentHabitat,
    currentHabitatIndex,
    currentSpecies,
    setButtonState,
    setBroadcastMsg,
    playSound,
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

  const habitatSolved = solvedSpecies.length === currentHabitat.species.length;

  return (
    <>
      {habitatSolved && <Celebration trigger={true} duration={9000} />}
      <p className={styles.phrase}>
        {range(phraseLength).map((num) => (
          <span key={num} className={styles.letterContainer}>
            {/* \u00A0 means non-breaking space */}
            {isSpaceCharacter(num) ? (
              "\u00A0 "
            ) : isGuessedCharacter(num) ? (
              <span
                className={
                  newlySolvedIndices.includes(num) ||
                  (animateGuess && speciesName.charAt(num) === animateGuess)
                    ? styles.phraseGuessAnimation
                    : ""
                }
              >
                {speciesName.charAt(num)}{" "}
              </span>
            ) : (
              "_ "
            )}
          </span>
        ))}
      </p>
    </>
  );
}
