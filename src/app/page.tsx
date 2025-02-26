import Game from './components/Game/Game';
import styles from './page.module.css';

export default function App() {
    return (
        <div className={styles.pageContainer}>

            <div className={styles.topContainer}>
                <header className={styles.header}>TerraText</header>
            </div>            

            <Game></Game>

            <footer className={styles.footer}>footer</footer>

        </div>
    );
}
