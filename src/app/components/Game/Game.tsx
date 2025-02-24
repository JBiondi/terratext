'use client';

import React from 'react';
import styles from './Game.module.css';

import { HabitatContextProvider } from '@/context/HabitatContextProvider';
import Clue from '../Clue/Clue';
import Input from '../Input/Input';
import Phrase from '../Phrase/Phrase';

export default function Game() {
    // re: unused variable error, it is used in the functional state setter update
    const [userGuesses, setUserGuesses] = React.useState<string[]>([]);

    function handleSubmitUserGuess(inputGuess: string): void {
      // this console log is here to quiet the userGuesses unused error explained above
      console.log({ userGuesses })

      setUserGuesses((prevUserGuesses) => [...prevUserGuesses, inputGuess]);
    }

    return (
        <div className={styles.outerContainer}>
            <HabitatContextProvider>
                <Phrase></Phrase>

                <div className={styles.innerContainer}>
                    <Clue></Clue>
                    <Input handleSubmitUserGuess={handleSubmitUserGuess}></Input>
                </div>

            </HabitatContextProvider>
        </div>
    );
}
