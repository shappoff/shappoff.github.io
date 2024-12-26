import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href="/zhigalo">Семен Жигало. Дневник.</Link>
      </main>
      <footer className={styles.footer}>

      </footer>
    </div>
  );
}
