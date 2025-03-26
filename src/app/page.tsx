import Game from "./components/game/game";
import styles from "./page.module.css";
import Link from "next/link";

import MuteButton from "./components/mute-button/mute-button";

import { fetchHabitats } from "@/lib/data";

export default async function Page() {
  const habitats = await fetchHabitats();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.topContainer}>
        <Link href="/about" className={styles.navLink}>
          About
        </Link>
        <h1 className={styles.h1}>TerraText</h1>
        <MuteButton />
      </div>

      <Game habitats={habitats} />

      <footer className={styles.footer}>
        photos courtesy of Unsplash.com <br />
        sounds from Zapsplat.com
      </footer>
    </div>
  );
}
