import styles from "../page.module.css";
import Link from "next/link";

export default function KP() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h1 id="книги-память">Книги Память:</h1>
                <p><Link href="/kp/tolochinskiy">Память. Толочинский район</Link></p>

                <p><Link href="/kp/krupskiy">Память. Крупский район</Link></p>

                <p><Link href="/kp/beshenkovichskiy">Память. Бешенковичский район</Link></p>

                <p><Link href="/kp/berezovskiy">Память. Берёзовский район</Link></p>

                <p><Link href="/kp/sennenskiy">Память. Сенненский район</Link></p>
            </main>
        </div>
    );
}
