"use client";

import React from "react";
import Modal from "../modal/modal";
import Link from "next/link";
import styles from "./about-modal-toggle.module.css";

import { useAudio } from "@/context/audio-context-provider";

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
              TerraText is a portfolio project still in development 🐦‍⬛
            </p>
            <p className={styles.aboutModalContentP}>
              More species, more habitats, UI refinements and performance improvements are on the way
              🐻‍❄️
            </p>
            <p className={styles.aboutModalContentP}>
              The project is written in TypeScript using React and Next.js with Postgres via
              Supabase. For styling I use CSS modules.
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
              <small>© 2025 J Biondi. All rights reserved.</small>
            </p>
          </div>
        </Modal>
      )}
    </>
  );
}
