"use client";

import React from "react";
import styles from "./game.module.css";

import { HabitatContextProvider } from "@/context/habitat-context-provider";

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

  function handleSubmitUserGuess(inputGuess: string): void {
      setUserGuesses((prevUserGuesses) => [...prevUserGuesses, inputGuess]);
  }

  return (
    <HabitatContextProvider initialHabitats={initialHabitats}>
      <Phrase />

      <div className={styles.secondRowContainer}>
        <Clue />
        <Input handleSubmitUserGuess={handleSubmitUserGuess}/>
        <AlreadyGuessed userGuesses={userGuesses}/>
      </div>

      <HabitatMap />
    </HabitatContextProvider>
  );
}
