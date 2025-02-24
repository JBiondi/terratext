'use client';

import React from 'react';
import styles from './Clue.module.css';
import { useHabitat } from '@/context/HabitatContextProvider';

export default function Clue() {

    const { currentSpecies } = useHabitat();

    return (
        <p className={styles.specialP}>{currentSpecies ? currentSpecies.clue : 'Loading clue...'}</p>
    )
}