'use client';

import React from 'react';
import { useHabitat } from '@/context/HabitatContextProvider';

export default function Clue() {

    const { currentSpecies } = useHabitat();

    return (
        <p>Clue: {currentSpecies ? currentSpecies.clue : 'Loading clue...'}</p>
    )
}