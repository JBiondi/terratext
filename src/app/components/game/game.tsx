"use client";

import React from "react";
import styles from "./game.module.css";

import { HabitatContextProvider } from "@/context/habitat-context-provider";

import Broadcast from "../broadcast/broadcast";
import Clue from "../clue/clue";
import Input from "../input/input";
import NextSpeciesButton from "../next-species-button/next-species-button";
import Phrase from "../phrase/phrase";
import AlreadyGuessed from "../already-guessed/already-guessed";
import HabitatMap from "../habitat-map/habitat-map";

import type { Habitat } from "@/types/habitat-types";
import type { Species } from "@/types/habitat-types";

interface GameProps {
  habitats: Habitat[];
}

export default function Game({ habitats }: GameProps) {
  const [userGuesses, setUserGuesses] = React.useState<string[]>([]);
  const [solvedSpecies, setSolvedSpecies] = React.useState<Species[]>([]);
  const [buttonTime, setButtonTime] = React.useState(false);
  const [broadcastMsg, setBroadcastMsg] = React.useState<string>(
    "Use hints to solve the puzzle and reveal habitat species"
  );

  const guessedLetters = React.useMemo(() => {
    return Array.from(new Set(userGuesses.flatMap((guess) => guess.split("")))).filter(
      (letter) => letter !== " "
    );
  }, [userGuesses]);

  function handleSubmitUserGuess(inputGuess: string): void {
    setUserGuesses((prevUserGuesses) => [...prevUserGuesses, inputGuess]);
  }

  return (
    <HabitatContextProvider habitats={habitats}>
      <Broadcast broadcastMsg={broadcastMsg} />
      <Phrase
        guessedLetters={guessedLetters}
        setBroadcastMsg={setBroadcastMsg}
        setSolvedSpecies={setSolvedSpecies}
        setButtonTime={setButtonTime}
      />

      <div className={styles.secondRowContainer}>
        <Clue />
        {buttonTime ? (
          <NextSpeciesButton
            setBroadcastMsg={setBroadcastMsg}
            setUserGuesses={setUserGuesses}
            setButtonTime={setButtonTime}
          />
        ) : (
          <Input handleSubmitUserGuess={handleSubmitUserGuess} />
        )}
        <AlreadyGuessed guessedLetters={guessedLetters} />
      </div>

      <HabitatMap solvedSpecies={solvedSpecies} />
    </HabitatContextProvider>
  );
}
