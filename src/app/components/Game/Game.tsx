'use client';

import React from 'react';
import styles from './Game.module.css';

import { HabitatContextProvider } from '@/context/HabitatContextProvider';
import Clue from '../Clue/Clue';
import Input from '../Input/Input';
import Phrase from '../Phrase/Phrase';

export default function Game() {

  const [userGuesses, setUserGuesses] = React.useState([]);

  function handleSubmitUserGuess(inputGuess) {
    setUserGuesses([...userGuesses, inputGuess]);
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