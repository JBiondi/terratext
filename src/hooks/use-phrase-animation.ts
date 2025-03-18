import React from "react";

export default function usePhraseAnimation(
  speciesName: string,
  guessedLetters: string[],
  duration: number
): number[] {
  const [newlySolvedIndices, setNewlySolvedIndices] = React.useState<number[]>([]);
  const prevGuessedLettersRef = React.useRef<string[]>([]);

  React.useEffect(() => {
    const prevGuessed = prevGuessedLettersRef.current;
    const newIndices: number[] = [];

    for (let i = 0; i < speciesName.length; i++) {
      if (speciesName[i] === " ") continue;

      if (
        guessedLetters.includes(speciesName[i]) &&
        !prevGuessed.includes(speciesName[i])
      ) {
        newIndices.push(i);
      }
    }

    prevGuessedLettersRef.current = guessedLetters;

    if (newIndices.length > 0) {
      setNewlySolvedIndices(newIndices);

      const timer = setTimeout(() => {
        setNewlySolvedIndices([]);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [guessedLetters, speciesName, duration]);

  return newlySolvedIndices;
}
