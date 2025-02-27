"use client";

import React from "react";
import styles from "./Game.module.css";

import { HabitatContextProvider } from "@/context/habitat-context-provider";
import Clue from "../clue/clue";
import Input from "../input/input";
import Phrase from "../phrase/phrase";
import AlreadyGuessed from "../already-guessed/already-guessed";
import HabitatMap from "../habitat-map/habitat-map";

export default function Game() {
  const [userGuesses, setUserGuesses] = React.useState<string[]>([]);

  function handleSubmitUserGuess(inputGuess: string): void {
    // TODO remove this later when userGuesses is probably used somewhere else
    console.log({ userGuesses });

    setUserGuesses((prevUserGuesses) => [...prevUserGuesses, inputGuess]);
  }

  return (
    <HabitatContextProvider>
      <Phrase></Phrase>

      <div className={styles.secondRowContainer}>
        <Clue></Clue>
        <Input handleSubmitUserGuess={handleSubmitUserGuess}></Input>
        <AlreadyGuessed></AlreadyGuessed>
      </div>

      <HabitatMap></HabitatMap>
    </HabitatContextProvider>
  );
}
