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
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Guess a letter"
        className={styles.input}
        id="input-guess"
        aria-label="Guess a letter"
        required
        autoFocus
        maxLength={1}
        type="text"
        value={inputGuess}
        onChange={(event) => {
          setInputGuess(event.target.value.toUpperCase());
        }}
      />
    </form>
  );
}
