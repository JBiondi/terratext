"use client";

import React from "react";
import styles from "./modal.module.css";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  const handleOverlayClick = () => onClose();
  const handleContentClick = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal} onClick={handleContentClick}>
        <button onClick={onClose} className={styles.closeBtn}>
          X
        </button>
        {children}
      </div>
    </div>
  );
}
