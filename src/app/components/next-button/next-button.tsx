"use client";

import React from "react";
import styles from "./next-button.module.css";

import { useHabitat } from "@/context/habitat-context-provider";
import { useAudio } from "@/context/audio-context-provider";
import useTimeoutAnimation from "@/hooks/use-timeout-animation";

import type { ButtonState } from "@/types/types";
import type { Species } from "@/types/types";


interface NextButtonProps {
  setBroadcastMsg: React.Dispatch<React.SetStateAction<string>>;
  setUserGuesses: React.Dispatch<React.SetStateAction<string[]>>;
  buttonState: ButtonState;
  setButtonState: React.Dispatch<React.SetStateAction<ButtonState>>;
  setSolvedSpecies: React.Dispatch<React.SetStateAction<Species[]>>;
  onReset?: () => void;
}

export default function NextButton({
  setBroadcastMsg,
  setUserGuesses,
  buttonState,
  setButtonState,
  setSolvedSpecies,
  onReset
}: NextButtonProps) {
  const { playSound, playBackgroundMusic, stopBackgroundMusic, musicMuted } = useAudio();
  const { habitats, currentHabitatIndex, setCurrentSpeciesIndex, setCurrentHabitatIndex } =
    useHabitat();

  const animationDuration = 250;
  const { isAnimating, triggerAnimation } = useTimeoutAnimation(animationDuration);

  const habitatName = habitats[currentHabitatIndex].name;
  let nextHabitatName = "placeholder";

  if (currentHabitatIndex < habitats.length - 1) {
    nextHabitatName = habitats[currentHabitatIndex + 1].name;
  }

  function nextButtonHandler() {
    triggerAnimation();
    playSound("nextButtonClicked");

    setTimeout(() => {
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
      } else if (buttonState.action === "restart game") {
        setCurrentSpeciesIndex(0);
        setCurrentHabitatIndex(0);

        if (!musicMuted) {
          stopBackgroundMusic();
          playBackgroundMusic();
        }

        setSolvedSpecies([]);
        setUserGuesses([]);
        setBroadcastMsg("Use hints to solve the puzzle and reveal habitat species");
        setButtonState((prevState) => ({
          ...prevState,
          time: false,
        }));
      }
      if (onReset) {
        onReset();
      }
    }, animationDuration);
  }

  return (
    <button
      className={`${styles.nextButton} ${isAnimating ? styles.animateBtn : ""}`}
      onClick={nextButtonHandler}
    >
      {/* \u00A0 means non-breaking space */}
      {buttonState.action === "next species" && "Next Species \u00A0 ➪"}
      {buttonState.action === "next habitat" && "Next Habitat \u00A0 ➪"}
      {buttonState.action === "restart game" && "Restart Game \u00A0 ➪"}
    </button>
  );
}
