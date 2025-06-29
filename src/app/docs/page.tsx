import Link from "next/link";
import '../main-page.css';

const links = [
    {
        href: "/zalazje1943",
        title: "Залазье, аэрофотосьемка",
        description: "14 октября 1943 г., Толочинский район, Витебская область.",
    },
    {
        href: "/bocheikovo1943",
        title: "Бочейково, аэрофотосьемка",
        description: "4 августа 1943 г., Бешенковичский район, Витебская область.",
    },
    {
        href: "/glinniki1870",
        title: "Глинники",
        description: "План деревни. 1870 г., Могилевская губерния, Могилевский уезд, Павловичская волость",
    },
    {
        href: "/glinniki1846",
        title: "имение Глинники",
        description: "План имения. 1846 г. Могилевская губерния, Могилевский уезд, Павловичская волость",
    },
];

export default function Docs() {
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
