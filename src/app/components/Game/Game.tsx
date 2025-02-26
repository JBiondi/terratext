'use client';

import React from 'react';
import styles from './Game.module.css';

import { HabitatContextProvider } from '@/context/HabitatContextProvider';
import Clue from '../Clue/Clue';
import Input from '../Input/Input';
import Phrase from '../Phrase/Phrase';
import AlreadyGuessed from '../AlreadyGuessed/AlreadyGuessed';
import HabitatMap from '../HabitatMap/HabitatMap'


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
