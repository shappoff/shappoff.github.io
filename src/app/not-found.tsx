import {monomakhUnicode} from "@/components/fonts";
import './not-found.css';

export default function NotFound() {
    return (
        <div className={`error-page-container ${monomakhUnicode.variable}`} style={{fontFamily: 'var(--font-monomakh), serif'}}>
            <div className="error-document">
                <div className="paper-background"></div>
                <div className="wax-seal">
                    <div className="wax-seal-text">404</div>
                    <div className="wax-seal-overlay"></div>
                </div>
                <div className="content-container">
                    <div className="ornate-header">
                        <div className=" header-title">Императорскій Указъ</div>
                        <div className="divider">
                            <div className="divider-line"></div>
                            <div className="divider-symbol">✦</div>
                            <div className="divider-line"></div>
                        </div>
                    </div>
                    <h1 className=" main-title">Страница не найдена</h1>
                    <div className=" error-code">404</div>
                    <p className=" russian-text">По указу Его Императорского Величества, сим объявляется, что искомый
                        документ не обнаружен в архивах.</p><p className="english-text">By decree of His Imperial
                    Majesty, it is hereby declared that the requested document was not found in the archives.</p>
                    <div className="ornate-divider">
                        <div className="ornate-divider-line"></div>
                        <div className="ornate-divider-symbol">❧</div>
                        <div className="ornate-divider-line"></div>
                    </div>
                    <div className="button-container"><a href="/" className=" return-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="lucide lucide-chevron-left return-icon">
                            <path d="m15 18-6-6 6-6"></path>
                        </svg>
                        <span>Вернуться на главную</span></a></div>
                    <div className=" footer-text">
                        {(() => {
                            // Get current date
                            const currentDate = new Date();
                            const currentMonth = currentDate.getMonth(); // 0-11 (January is 0)
                            const currentYear = currentDate.getFullYear();

                            // Calculate Byzantine year (Creation Era of Constantinople)
                            // If date is between January 1 and August 31, add 5508
                            // If date is between September 1 and December 31, add 5509
                            const byzantineYear = currentMonth < 8 ? currentYear + 5508 : currentYear + 5509;

                            return `Составлено и скреплено печатью в лето ${byzantineYear} от сотворения мира`;
                        })()}
                    </div>
                </div>
                <div className="corner-ornament corner-top-left"></div>
                <div className="corner-ornament corner-top-right"></div>
                <div className="corner-ornament corner-bottom-left"></div>
                <div className="corner-ornament corner-bottom-right"></div>
            </div>
        </div>
    )
}
