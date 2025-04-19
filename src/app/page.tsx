import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href="/zhigalo">Дневник Семёна Жигало, д. Скакуновщина, Бешенковичский район.</Link>
        <Link href="/names">Имена. Подбор католических и православных имен.</Link>
        <Link href="/copy">Копии документов что есть у меня.</Link>
        <Link href="/fond">Документы, которые я планирую смотреть в архивах.</Link>
        <Link href="/zalazje1943">Деревня Залазье 14 октября 1943 г., Толочинский район, Витебская область.</Link>
        <Link href="/glinniki1870">План д. Глинники, 1870 г., Могилевская губерния, Могилевский уезд, Павловичская волость</Link>
        <Link href="/glinniki1846">План имения Глинники, 1846 г. Могилевская губерния, Могилевский уезд, Павловичская волость</Link>
        <Link href="/niab">Фонды и описи НИАБ. Удобный поиск описей по фондам НИАБ (Национальный исторический архив Беларуси).</Link>
        <Link href="/kp">Книги Память.</Link>
        <Link href="/prikhody">Приходы Беларуси. Карта церквей и костелов. Сохранность метрических записей.</Link>
        <Link href="/catalogarchivesgov">Карта аэрофотосъемки Беларуси времен ВОВ.</Link>
      </main>
      <footer className={styles.footer}>

      </footer>
    </div>
  );
}
