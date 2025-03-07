"use client";

import React from "react";
import styles from "./game.module.css";

import { HabitatContextProvider } from "@/context/habitat-context-provider";

import Broadcast from "../broadcast/broadcast";
import Clue from "../clue/clue";
import Input from "../input/input";
import Phrase from "../phrase/phrase";
import AlreadyGuessed from "../already-guessed/already-guessed";
import HabitatMap from "../habitat-map/habitat-map";

import { Habitat } from "@/types/habitat-types";

interface GameProps {
  initialHabitats: Habitat[];
}

export default function Game({ initialHabitats }: GameProps) {
  const [userGuesses, setUserGuesses] = React.useState<string[]>([]);
  const [broadcastMsg, setBroadcastMsg] = React.useState<string>('Use hints to solve the puzzle and reveal habitat species');

  const guessedLetters = React.useMemo(() => {
    return Array.from(new Set(userGuesses.flatMap((guess) => guess.split("")))).filter(
      (letter) => letter !== " "
    );
  }, [userGuesses]);

  function handleSubmitUserGuess(inputGuess: string): void {
    setUserGuesses((prevUserGuesses) => [...prevUserGuesses, inputGuess]);
  }

  return (
    <HabitatContextProvider initialHabitats={initialHabitats}>
      <Broadcast broadcastMsg={broadcastMsg}/>
      <Phrase guessedLetters={guessedLetters} setBroadcastMsg={setBroadcastMsg} />

      <div className={styles.secondRowContainer}>
        <Clue />
        <Input handleSubmitUserGuess={handleSubmitUserGuess} />
        <AlreadyGuessed guessedLetters={guessedLetters} />
      </div>

      <HabitatMap />
    </HabitatContextProvider>
  );
}
