"use client";

import React from "react";
import styles from "./game.module.css";

import { HabitatContextProvider } from "@/context/habitat-context-provider";

import Broadcast from "../broadcast/broadcast";
import Clue from "../clue/clue";
import Input from "../input/input";
import NextButton from "../next-button/next-button";
import Phrase from "../phrase/phrase";
import AlreadyGuessed from "../already-guessed/already-guessed";
import HabitatMap from "../habitat-map/habitat-map";

import type { Habitat } from "@/types/types";
import type { Species } from "@/types/types";
import type { ButtonState } from "@/types/types";

interface GameProps {
  habitats: Habitat[];
}

export default function Game({ habitats }: GameProps) {
  const [userGuesses, setUserGuesses] = React.useState<string[]>([]);
  const [solvedSpecies, setSolvedSpecies] = React.useState<Species[]>([]);
  const [animateGuess, setAnimateGuess] = React.useState<string | null>(null);
  const [buttonState, setButtonState] = React.useState<ButtonState>({
    time: false,
    action: "next species",
  });
  const [broadcastMsg, setBroadcastMsg] = React.useState<string>(
    "Use clues to solve the puzzle and reveal habitat species"
  );

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
    }, 1000);
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
      />

      <div className={styles.secondRowContainer}>
        <Clue solvedSpecies={solvedSpecies} />
        {buttonState.time ? (
          <NextButton
            setBroadcastMsg={setBroadcastMsg}
            setUserGuesses={setUserGuesses}
            buttonState={buttonState}
            setButtonState={setButtonState}
            setSolvedSpecies={setSolvedSpecies}
          />
        ) : (
          <Input handleSubmitUserGuess={handleSubmitUserGuess} />
        )}
        <AlreadyGuessed guessedLetters={guessedLetters} animateGuess={animateGuess} />
      </div>

      <HabitatMap solvedSpecies={solvedSpecies} />
    </HabitatContextProvider>
  );
}
