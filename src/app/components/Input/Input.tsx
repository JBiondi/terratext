'use client';

import React from 'react';
import styles from './Input.module.css';

interface InputProps {
    handleSubmitUserGuess: (inputGuess: string) => void;
}

export default function Input({ handleSubmitUserGuess }: InputProps) {
    const [inputGuess, setInputGuess] = React.useState('');

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        console.log({ inputGuess });

        handleSubmitUserGuess(inputGuess);
        setInputGuess('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <label className={styles.specialLabel} htmlFor="input-guess">
                Enter a guess between min and max characters
            </label>
            <input
                className={styles.specialInput}
                id="input-guess"
                required
                minLength={4}
                maxLength={14}
                type="text"
                value={inputGuess}
                onChange={(event) => {
                    setInputGuess(event.target.value.toUpperCase());
                }}
            />
        </form>
    );
}
