'use client';

import React from 'react';

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
            <label htmlFor="input-guess">
                Enter a guess between min and max characters
            </label>
            <input
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
