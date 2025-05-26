import Link from "next/link";
import './main-page.css';

const links = [
    {href: "/catalogarchivesgov", title: "Карта аэрофотосъемки", description: "Беларусь времен ВОВ."},
    {
        href: "/prikhody",
        title: "Приходы Беларуси",
        description: "Карта церквей и костелов. Сохранность метрических записей.",
    },
    {
        href: "/niab",
        title: "Фонды и описи НИАБ",
        description: "Удобный поиск описей по фондам НИАБ (Национальный исторический архив Беларуси).",
    },
    {href: "/zhigalo", title: "Дневник Семёна Жигало", description: "Этот дневник был найден в д. Скакуновщина в старой хате за печкой во время ремонта. Он велся с 1930-го по 1943-й годы."},
    {href: "/names", title: "Имена, католические и православные", description: "Удобный сервис для подбора неразборчиво написанных имён."},
    {href: "/kp", title: "Книги Память", description: "Проиндексированные книги. Удобен поиск по всей книге (Ctrl+F)"},
    {href: "/docs", title: "Документы", description: "Карты, аэрофотоснимки, документы"},
];

export default function Home() {
    return (
        <div className="page-container">
            <div className="content-container">
                <div className="links-grid" style={{opacity: 1, willChange: 'opacity'}}>
                    {
                        links.map(({href, title, description}: any, index: number) => <div className="link-card" style={{animationDelay: `${index + 1}00ms`}}>
                            <Link href={href} className="card-content">
                                <div className="card-header">
                                    <div>
                                        <h2 className="card-title">{title}</h2>
                                        <p className="card-description">{description}</p>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none"
                                         stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                         strokeLinejoin="round"
                                         className="lucide lucide-external-link card-icon">
                                        <path d="M15 3h6v6"></path>
                                        <path d="M10 14 21 3"></path>
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                    </svg>
                                </div>
                            </Link></div>)
                    }
                </div>
            </div>
        </div>
    );
}
