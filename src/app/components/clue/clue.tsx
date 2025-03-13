"use client";

import React from "react";
import styles from "./clue.module.css";
import { useHabitat } from "@/context/habitat-context-provider";
import type { Species } from "@/types/types";

interface ClueProps {
  solvedSpecies: Species[];
}

export default function Clue({ solvedSpecies }: ClueProps) {
  const { habitats, currentHabitatIndex, currentSpeciesIndex } = useHabitat();
  const currentSpecies = habitats[currentHabitatIndex].species[currentSpeciesIndex];

  if (!currentSpecies) {
    return <p>Loading clue...</p>;
  }

  const isSolved = solvedSpecies.includes(currentSpecies);

  return (
    <p className={`${isSolved ? styles.latin : styles.clue}`}>
      {isSolved ? (
        // this fragment helps group the span and the variable together
        <>
          <span className={styles.latinLabel}>Latin name:</span> {currentSpecies.latin}
        </>
      ) : (
        currentSpecies.clue
      )}
    </p>
  );
}
