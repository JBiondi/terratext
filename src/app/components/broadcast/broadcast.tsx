import styles from './broadcast.module.css';

interface BroadcastProps {
    broadcastMsg: string;
}

export default function Broadcast({ broadcastMsg }: BroadcastProps) {

    return (
        <p className={styles.broadcast}>{broadcastMsg}</p>
    )
}