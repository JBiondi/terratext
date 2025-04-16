import styles from "./page.module.css";
import Link from "next/link";

import AboutModalToggle from "./components/about-modal-toggle/about-modal-toggle";
import SoundsButton from "./components/sounds-button/sounds-button";
import MusicButton from "./components/music-button/music-button";
import Game from "./components/game/game";
import { fetchHabitats } from "@/lib/data";
import { AudioContextProvider } from "@/context/audio-context-provider";
import AudioInitializer from "./components/audio-initializer/audio-initializer";

export default async function Page() {
  const habitats = await fetchHabitats();

  return (
    <AudioContextProvider>
      <AudioInitializer />
      <div className={styles.pageContainer}>
        <div className={styles.topContainer}>
          <AboutModalToggle />
          <h1 className={styles.h1}>TerraText (staging)</h1>
          <div className={styles.buttonGroup}>
            <MusicButton />
            <SoundsButton />
          </div>
        </div>

        <Game habitats={habitats} />

        <footer className={styles.footer}>
          photos courtesy of{" "}
          <Link href="https://unsplash.com/" target="_blank" rel="noopener noreferrer">
            Unsplash.com
          </Link>{" "}
          <br />
          sounds from{" "}
          <Link href="https://zapsplat.com/" target="_blank" rel="noopener noreferrer">
            Zapsplat.com
          </Link>
        </footer>
      </div>
    </AudioContextProvider>
  );
}
