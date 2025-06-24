"use client";

import React from "react";

import { HabitatContextProvider } from "@/context/habitat-context-provider";
import { useIsMobile } from "@/hooks/use-is-mobile";
import type { Habitat } from "@/types/types";
import type { Species } from "@/types/types";
import type { ButtonState } from "@/types/types";

import styles from "./game.module.css";
import AlreadyGuessed from "../already-guessed/already-guessed";
import Broadcast from "../broadcast/broadcast";
import Clue from "../clue/clue";
import HabitatMap from "../habitat-map/habitat-map";
import Input from "../input/input";
import NextButton from "../next-button/next-button";
import OnScreenKeyboard from "../on-screen-keyboard/on-screen-keyboard";
import Phrase from "../phrase/phrase";
import SkipHabitatButton from "../skip-habitat-button/skip-habitat-button";
import SolveHabitatButton from "../solve-habitat-button/solve-habitat-button";

interface GameProps {
  habitats: Habitat[];
}

export default function Game({ habitats }: GameProps) {
  const [userGuesses, setUserGuesses] = React.useState<string[]>([]);
  const [solvedSpecies, setSolvedSpecies] = React.useState<Species[]>([]);
  const [animateGuess, setAnimateGuess] = React.useState<string | null>(null);
  const [keyboardResetCount, setKeyboardResetCount] = React.useState(0);
  const [showPerfect, setShowPerfect] = React.useState(false);
  const [buttonState, setButtonState] = React.useState<ButtonState>({
    time: false,
    action: "next species",
  });
  const [broadcastMsg, setBroadcastMsg] = React.useState<string>(
    "Solve the puzzle to reveal habitat species"
  );

  const isMobile = useIsMobile();

  const handleKeyboardReset = React.useCallback(() => {
    setTimeout(() => {
      setKeyboardResetCount((count) => count + 1);
    }, 50);
  }, []);

  const guessedLetters = React.useMemo(() => {
    return Array.from(new Set(userGuesses.flatMap((guess) => guess.split("")))).filter(
      (letter) => letter !== " "
    );
  }, [userGuesses]);

  function handleSubmitUserGuess(inputGuess: string): void {
    setAnimateGuess(inputGuess);

    if (!guessedLetters.includes(inputGuess)) {
      setUserGuesses((prevUserGuesses) => [...prevUserGuesses, inputGuess]);
    }

    setTimeout(() => {
      setAnimateGuess(null);
    }, 500);
  }

  return (
    <HabitatContextProvider habitats={habitats}>
      <Broadcast broadcastMsg={broadcastMsg} />
      <Phrase
        guessedLetters={guessedLetters}
        setBroadcastMsg={setBroadcastMsg}
        solvedSpecies={solvedSpecies}
        setSolvedSpecies={setSolvedSpecies}
        setButtonState={setButtonState}
        setShowPerfect={setShowPerfect}
        animateGuess={animateGuess}
      />
      <div className={styles.mobileSwapContainer}>
        <div className={styles.secondRowContainer}>
          <Clue solvedSpecies={solvedSpecies} />
          {buttonState.time ? (
            <NextButton
              setBroadcastMsg={setBroadcastMsg}
              setUserGuesses={setUserGuesses}
              buttonState={buttonState}
              setButtonState={setButtonState}
              setSolvedSpecies={setSolvedSpecies}
              onReset={handleKeyboardReset}
            />
          ) : isMobile ? (
            <OnScreenKeyboard
              key={`keyboard-${keyboardResetCount}`}
              handleSubmitUserGuess={handleSubmitUserGuess}
              guessedLetters={guessedLetters}
            />
          ) : (
            <Input handleSubmitUserGuess={handleSubmitUserGuess} guessedLetters={guessedLetters} />
          )}
          {!isMobile && (
            <AlreadyGuessed guessedLetters={guessedLetters} animateGuess={animateGuess} />
          )}
        </div>
        {showPerfect && <div className={styles.perfectPopup}>🌠 PERFECT! 🌠</div>}

        <HabitatMap solvedSpecies={solvedSpecies} className={styles.habitatMap} />
        <SkipHabitatButton setSolvedSpecies={setSolvedSpecies} setUserGuesses={setUserGuesses} setButtonState={setButtonState} className={styles.skipButton}/>
        <SolveHabitatButton setSolvedSpecies={setSolvedSpecies} setUserGuesses={setUserGuesses} setButtonState={setButtonState} className={styles.solveButton}/>
      </div>
    </HabitatContextProvider>
  );
}
