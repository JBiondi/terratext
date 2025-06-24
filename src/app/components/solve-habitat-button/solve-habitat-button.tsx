"use client";

import React from "react";

import { useHabitat } from "@/context/habitat-context-provider";
import type { Species } from "@/types/types";
import type { ButtonState } from "@/types/types";

import styles from "./solve-habitat-button.module.css";


interface SolveButtonProps {
  setSolvedSpecies: React.Dispatch<React.SetStateAction<Species[]>>;
  setUserGuesses: React.Dispatch<React.SetStateAction<string[]>>;
  setButtonState: React.Dispatch<React.SetStateAction<ButtonState>>;
  className?: string;
}

export default function SolveHabitatButton({
  setSolvedSpecies,
  setUserGuesses,
  setButtonState,
}: SolveButtonProps) {
  const { habitats, currentHabitatIndex } = useHabitat();

  function handleSkip() {
    
    setSolvedSpecies(habitats[currentHabitatIndex].species);
    setUserGuesses([]);
    setButtonState({ time: false, action: "next species" });
  }

  return (
    <button className={styles.solveButton} onClick={handleSkip}>
      Dev Mode - Solve Habitat
    </button>
  );
}
