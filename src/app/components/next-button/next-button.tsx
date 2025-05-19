"use client";

import React from "react";
import styles from "./next-button.module.css";

import { useHabitat } from "@/context/habitat-context-provider";
import { useAudio } from "@/context/audio-context-provider";
import { useIsSafari } from "@/hooks/use-is-safari";
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
  onReset,
}: NextButtonProps) {
  const { playSound, playBackgroundMusic, stopBackgroundMusic, musicMuted } = useAudio();
  const { habitats, currentHabitatIndex, setCurrentSpeciesIndex, setCurrentHabitatIndex } =
    useHabitat();
  const isSafari = useIsSafari();
  const [isDisabled, setIsDisabled] = React.useState(false);

  const animationDuration = 250;
  const { isAnimating, triggerAnimation } = useTimeoutAnimation(animationDuration);

  const habitatName = habitats[currentHabitatIndex].name;
  let nextHabitatName = "placeholder";

  if (currentHabitatIndex < habitats.length - 1) {
    nextHabitatName = habitats[currentHabitatIndex + 1].name;
  }

  function nextButtonHandler() {
    if (isDisabled) return;

    setIsDisabled(true);

    triggerAnimation();
    playSound("buttonClicked");

    if (isSafari) {
      document.body.style.pointerEvents = "none";
      // Force reflow
      void document.body.offsetHeight;
    }

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

      if (isSafari) {
        // Restore pointer events after a delay
        setTimeout(() => {
          document.body.style.pointerEvents = "";
        }, 300);
      }

      if (onReset) {
        onReset();
      }

      // Re-enable the button after all operations are complete
      setTimeout(() => {
        setIsDisabled(false);
      }, 500);
    }, animationDuration);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      nextButtonHandler();
    }
  }

  return (
    <button
      className={`${styles.nextButton} ${isAnimating ? styles.animateBtn : ""}`}
      onClick={nextButtonHandler}
      onKeyDown={handleKeyDown}
      disabled={isDisabled}
      tabIndex={0}
      autoFocus
    >
      {/* \u00A0 means non-breaking space */}
      {buttonState.action === "next species" && "Next Species \u00A0➪"}
      {buttonState.action === "next habitat" && "Next Habitat \u00A0➪"}
      {buttonState.action === "restart game" && "Restart Game \u00A0➪"}
    </button>
  );
}
