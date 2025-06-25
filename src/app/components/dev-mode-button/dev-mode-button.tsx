"use client";

import React from "react";

import styles from "./dev-mode-button.module.css";

interface DevModeButtonProps {
  setShowSolveButtons: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DevModeButton({ setShowSolveButtons }: DevModeButtonProps) {

  const [label, setLabel] = React.useState("Dev Mode");

  function handleClick() {
    setShowSolveButtons((prev) => !prev);
    setLabel((prev) => (prev === "Dev Mode" ? "Exit Dev Mode" : "Dev Mode"));
  }

  return (
    <button className={styles.devModeButton} onClick={handleClick}>
      {label}
    </button>
  );
}
