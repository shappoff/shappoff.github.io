import fs from "fs";
import Page404 from "@/components/Page404";
import {monomakhUnicode} from "@/components/fonts";
import './not-found.css';
import path from "path";

export default function NotFound() {
    const srcApp = path.resolve(`src/app`);
    const filenames = fs.readdirSync( srcApp );
    const routeList = filenames.filter((file: string) => !~file.indexOf('.'));

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
                        {/*<div className=" header-title">Императорскїй Оу҆ка́зъ</div>*/}
                        <div className=" header-title">У҆ка́зъ</div>
                        <div className="divider">
                            <div className="divider-line"></div>
                            <div className="divider-symbol">✦</div>
                            <div className="divider-line"></div>
                        </div>
                    </div>
                    <h1 className=" main-title">Сїѧ страни́ца не найдена</h1>
                    <div className=" error-code">404</div>
                    {/*<p className=" russian-text">По ᲂу҆ка́зꙋ є҆го̀ Императорского вели́чества си҄мъ ѻбъѧвлѧетсѧ что̀ и҆ско́мый докꙋментъ не ѻбнарꙋженъ въ архивахъ.</p>*/}
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
                        <span>Вернꙋтьсѧ на гла́внꙋю</span></a></div>
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

                            return `соста́влено и҆ скреплено печа́тїю въ лѣ́то ${byzantineYear} ѻт сотворе́нїѧ мї́ра`;
                        })()}
                    </div>
                </div>
                <div className="corner-ornament corner-top-left"></div>
                <div className="corner-ornament corner-top-right"></div>
                <div className="corner-ornament corner-bottom-left"></div>
                <div className="corner-ornament corner-bottom-right"></div>
            </div>
            <Page404 routeList={routeList} />
        </div>
    )
}
