import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href="/zhigalo">Семен Жигало. Дневник.</Link>
        <Link href="/copy">Копии документов.</Link>
        <Link href="/fond">Документы для просмотра.</Link>
      </main>
      <footer className={styles.footer}>

      </footer>
    </div>
  );
}
