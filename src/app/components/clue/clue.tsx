"use client";

import React from "react";
import styles from "./clue.module.css";
import { useHabitat } from "@/context/habitat-context-provider";

export default function Clue() {
  const { habitats, currentHabitatIndex, currentSpeciesIndex } = useHabitat();
  const currentSpecies = habitats[currentHabitatIndex].species[currentSpeciesIndex];

  return (
    <p className={styles.clue}>
      {currentSpecies ? currentSpecies.clue : "Loading clue..."}
    </p>
  );
}
