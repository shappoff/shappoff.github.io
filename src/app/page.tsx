import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href="/zhigalo">Семен Жигало. Дневник.</Link>
        <Link href="/copy">Копии документов.</Link>
        <Link href="/fond">Документы для просмотра.</Link>
        <Link href="/glinniki1870">План д. Глинники, 1870 г..</Link>
        <Link href="/glinniki1846">План имения Глинники, 1846 г.</Link>
        <Link href="/niab">Фонды и описи НИАБ.</Link>
      </main>
      <footer className={styles.footer}>

      </footer>
    </div>
  );
}
