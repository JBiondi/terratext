"use client";

import React from "react";

import { useHabitat } from "@/context/habitat-context-provider";
import type { Species } from "@/types/types";
import type { ButtonState } from "@/types/types";

import styles from "./skip-habitat-button.module.css";


interface SkipButtonProps {
  setSolvedSpecies: React.Dispatch<React.SetStateAction<Species[]>>;
  setUserGuesses: React.Dispatch<React.SetStateAction<string[]>>;
  setButtonState: React.Dispatch<React.SetStateAction<ButtonState>>;
  className?: string;
}

export default function SkipHabitatButton({
  setSolvedSpecies,
  setUserGuesses,
  setButtonState,
}: SkipButtonProps) {
  const { setCurrentHabitatIndex, habitats, setCurrentSpeciesIndex } = useHabitat();

  function handleSkip() {
    setCurrentSpeciesIndex(0);
    setSolvedSpecies([]);
    setUserGuesses([]);
    setButtonState({ time: false, action: "next species" });

    setCurrentHabitatIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex < habitats.length ? nextIndex : 0;
    });
  }

  return (
    <button className={styles.skipButton} onClick={handleSkip}>
      Dev Mode - Skip Habitat
    </button>
  );
}
