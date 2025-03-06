import styles from './habitat-map.module.css';
import Image from 'next/image';

export default function HabitatMap() {
    return (
        <div className={styles.placeholderRectangle}>
            <Image 
                src='/images/arctic.jpg'
                width={644}
                height={400}
                alt='arctic-habitat'
            />
        </div>
    )
}