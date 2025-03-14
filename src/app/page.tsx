import Game from "./components/game/game";
import styles from "./page.module.css";

import { fetchHabitats } from "@/lib/data";

export default async function Page() {
  const habitats = await fetchHabitats();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.topContainer}>
        <header className={styles.header}>TerraText</header>
      </div>

      <Game habitats={habitats} />

      <footer className={styles.footer}>photos courtesy of Unsplash</footer>
    </div>
  );
}
