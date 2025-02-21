'use client';

import React from 'react';
import { HabitatContextProvider } from '@/context/HabitatContextProvider';
import Clue from '../Clue/Clue';
import Input from '../Input/Input';

export default function Game() {

  const [userGuesses, setUserGuesses] = React.useState([]);

  function handleSubmitUserGuess(inputGuess) {
    setUserGuesses([...userGuesses, inputGuess]);
  }
 
  return (
    <HabitatContextProvider>
      
        
        <Clue></Clue>
        <Input handleSubmitUserGuess={handleSubmitUserGuess}></Input>
        
      
    </HabitatContextProvider>
  );
}