"use client";

import React from "react";

import styles from "./dev-mode-button.module.css";

interface DevModeButtonProps {
  setShowSolveButtons: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DevModeButton({ setShowSolveButtons }: DevModeButtonProps) {
  function handleClick() {
    setShowSolveButtons((prev) => !prev);
  }

  return (
    <button className={styles.devModeButton} onClick={handleClick}>
      Dev Mode
    </button>
  );
}
