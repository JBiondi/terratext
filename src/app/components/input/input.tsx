"use client";

import React from "react";
import styles from "./input.module.css";

interface InputProps {
  handleSubmitUserGuess: (inputGuess: string) => void;
}

export default function Input({ handleSubmitUserGuess }: InputProps) {
  const [inputGuess, setInputGuess] = React.useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log({ inputGuess });

    handleSubmitUserGuess(inputGuess);
    setInputGuess("");
  }

  return (
    // TODO: remove magic numbers for min & max length
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Enter your guess"
        className={styles.input}
        id="input-guess"
        aria-label="Enter your guess"
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
