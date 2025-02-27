"use client";

import React from "react";
import styles from "./Clue.module.css";
import { useHabitat } from "@/context/habitat-context-provider";

export default function Clue() {
  const { currentSpecies } = useHabitat();

  return (
    <p className={styles.clue}>
      {currentSpecies ? currentSpecies.clue : "Loading clue..."}
    </p>
  );
}
