import React from "react";
import styles from "./next-button.module.css";
import { useHabitat } from "@/context/habitat-context-provider";
import type { ButtonState } from "@/types/types";
import type { Species } from "@/types/types";

interface NextButtonProps {
  setBroadcastMsg: React.Dispatch<React.SetStateAction<string>>;
  setUserGuesses: React.Dispatch<React.SetStateAction<string[]>>;
  buttonState: ButtonState;
  setButtonState: React.Dispatch<React.SetStateAction<ButtonState>>;
  setSolvedSpecies: React.Dispatch<React.SetStateAction<Species[]>>;
}

export default function NextButton({
  setBroadcastMsg,
  setUserGuesses,
  buttonState,
  setButtonState,
  setSolvedSpecies,
}: NextButtonProps) {
  const { habitats, currentHabitatIndex, setCurrentSpeciesIndex, setCurrentHabitatIndex } =
    useHabitat();

  const habitatName = habitats[currentHabitatIndex].name;
  let nextHabitatName = "placeholder";

  if (currentHabitatIndex < habitats.length - 1) {
    nextHabitatName = habitats[currentHabitatIndex + 1].name;
  }

  function nextButtonHandler() {
    if (buttonState.action === "next species") {
      setCurrentSpeciesIndex((prev) => prev + 1);
      setBroadcastMsg(`Solve another species for the ${habitatName} habitat`);
      setUserGuesses([]);
      setButtonState((prevState) => ({
        ...prevState,
        time: false,
      }));
    } else if (buttonState.action === "next habitat") {
      setCurrentSpeciesIndex(0);
      setCurrentHabitatIndex((prev) => prev + 1);
      setSolvedSpecies([]);
      setUserGuesses([]);
      setBroadcastMsg(`Can you populate this new ${nextHabitatName} habitat?`);
      setButtonState((prevState) => ({
        ...prevState,
        time: false,
      }));
    }
      else if (buttonState.action === "restart game") {
        setCurrentSpeciesIndex(0);
        setCurrentHabitatIndex(0);
        setSolvedSpecies([]);
        setUserGuesses([]);
        setBroadcastMsg("Use hints to solve the puzzle and reveal habitat species");
        setButtonState((prevState) => ({
          ...prevState,
          time: false,
        }));
      }
  }

  return (
    <button className={styles.nextButton} onClick={nextButtonHandler}>
      {buttonState.action === "next species" && "Next Species ➪"}
      {buttonState.action === "next habitat" && "New Habitat ➪"}
      {buttonState.action === "restart game" && "Restart Game ➪"}
    </button>
  );
}
