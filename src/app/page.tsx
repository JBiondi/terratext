import Game from './components/Game/Game';
import styles from './page.module.css';

export default function App() {
    return (
        <div className={styles.container}>
            <h1>TerraText</h1>

            <Game></Game>

            <footer className={styles.specialFooter}>photo credit</footer>
        </div>
    );
}
