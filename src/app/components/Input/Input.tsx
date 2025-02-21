'use client';

import React from 'react';

export default function Input({ handleSubmitUserGuess }) {
    const [inputGuess, setInputGuess] = React.useState('');

    function handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();
        console.log({inputGuess});

        handleSubmitUserGuess(inputGuess);
        setInputGuess('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='input-guess'> Enter a guess between min and max characters</label>
            <input
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
