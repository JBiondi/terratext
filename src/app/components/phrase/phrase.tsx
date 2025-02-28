"use client";

import React from "react";
import styles from "./phrase.module.css";
import { useHabitat } from "@/context/habitat-context-provider";
import { range } from "@/lib/rangeUtility";

export default function Phrase() {
  let phraseLength: number = 0;
  const { currentSpecies } = useHabitat();

  if (currentSpecies) {
    phraseLength = currentSpecies.name.length;
  }

  return (
    <p className={styles.slotSpan}>
      {range(phraseLength).map((num) => (
        <span key={num}>
          {/* An underscore for each letter but a non-breaking space(x2) for spaces */}
          {currentSpecies?.name.charAt(num) === " " ? "\u00A0 \u00A0" : "_ "}
        </span>
      ))}
    </p>
  );
}
