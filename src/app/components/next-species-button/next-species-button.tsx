import { useHabitat } from "@/context/habitat-context-provider";
import React from "react";
import styles from "./next-species-button.module.css";

interface NextSpeciesButtonProps {
  setBroadcastMsg: React.Dispatch<React.SetStateAction<string>>;
  setUserGuesses: React.Dispatch<React.SetStateAction<string[]>>;
  setButtonTime: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NextSpeciesButton({
  setBroadcastMsg,
  setUserGuesses,
  setButtonTime,
}: NextSpeciesButtonProps) {
    
  const { setCurrentSpeciesIndex } = useHabitat();

  function nextButtonHandler() {
    setCurrentSpeciesIndex((prev) => prev + 1);
    setBroadcastMsg("Solve another species for the habitat");
    setUserGuesses([]);
    setButtonTime(false);
  }

  return (
    <button className={styles.nextButton} onClick={nextButtonHandler}>
      Next Species ➪
    </button>
  );
}
