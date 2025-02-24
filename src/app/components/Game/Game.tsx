'use client';

import React from 'react';
import styles from './Game.module.css';

import { HabitatContextProvider } from '@/context/HabitatContextProvider';
import Clue from '../Clue/Clue';
import Input from '../Input/Input';
import Phrase from '../Phrase/Phrase';
import AlreadyGuessed from '../AlreadyGuessed/AlreadyGuessed';

export default function Game() {
    // re: unused variable error, 
    // it IS used in the functional state setter update,
    // inside handleSubmitUserGuess
    const [userGuesses, setUserGuesses] = React.useState<string[]>([]);

    function handleSubmitUserGuess(inputGuess: string): void {
      // console.log is here to quiet the 'userGuesses unused' error explained above
      // TODO remove this later when userGuesses is probably used somewhere else
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
                    <AlreadyGuessed></AlreadyGuessed>
                </div>

            </HabitatContextProvider>
        </div>
    );
}
