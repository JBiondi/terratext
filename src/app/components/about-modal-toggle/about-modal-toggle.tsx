"use client";

import Link from "next/link";
import React from "react";

import { useAudio } from "@/context/audio-context-provider";

import styles from "./about-modal-toggle.module.css";
import Modal from "../modal/modal";

export default function AboutModalToggle() {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const { playSound } = useAudio();

  function openModal(e: React.MouseEvent) {
    e.preventDefault();
    setModalOpen(true);
  }

  function closeModal() {
    playSound("buttonClicked");
    setModalOpen(false);
  }

  return (
    <>
      <button onClick={openModal} className={styles.aboutBtn}>
        About
      </button>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <div className={styles.aboutModalContainer}>
            <h1 className={styles.aboutModalContentH1}>About TerraText</h1>
            <p className={styles.aboutModalContentP}>
              I made this browser game to practice my web development skills and
              spread interesting nature facts 🐦‍⬛
            </p>
            <p className={styles.aboutModalContentP}>
              It&apos;s written in TypeScript using React and Next.js with a Postgres db via Supabase. For
              styling I used CSS modules.
            </p>
            <p className={styles.aboutModalContentP}>
              Questions? Bug report? Contact me on{" "}
              <Link
                href="https://www.linkedin.com/in/jessica-biondi/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.aboutModalContentLink}
              >
                LinkedIn
              </Link>{" "}
              or{" "}
              <Link
                href="https://www.github.com/JBiondi"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.aboutModalContentLink}
              >
                Github
              </Link>
              <br></br>
              <br></br>
              <small>Game © 2025 Jessica Biondi</small>
            </p>
          </div>
        </Modal>
      )}
    </>
  );
}
