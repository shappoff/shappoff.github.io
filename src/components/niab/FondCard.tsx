import React from "react";
import Card from '@mui/material/Card';

import {Accordion, Badge} from "react-bootstrap";
import Link from "next/link";
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const FondCard = ({item, index}: any) => {
    const {_highlightResult} = item;
    const anotation = _highlightResult.anotation?.value;
    const title = _highlightResult.title.value;
    const state = {title, anotation};
    const isTitle = !!~title.indexOf('<b>');
    const isAnotation = !!~anotation.indexOf('<b>');
    const activeKey = isTitle ? '0' : isAnotation ? '1' : '';

    const [currentAccordion, setCurrentAccordion] = React.useState<string>(activeKey);

    React.useEffect(() => {
        activeKey && setCurrentAccordion(activeKey);
    }, [activeKey]);

    // https://niab.by/newsite/ru/Priostanovka_hkranilische4
    const isntZal: any = !!fourthStorage[item.fod];

    const styleAnimationDelay = index < 12 ? {animationDelay: `${index + 1}00ms`} : {animationDelay: `${index + 1200}ms`};

    return <Card className="card" key={item.objectID} style={styleAnimationDelay}>
            {
                item.s ?
                    <div className="percentage-box" title={`${item.s} %`}>
                        <div className="empty-line">
                            <div title={`Проиндексирован на ${item.s}%`} className="percentage-line" style={{
                                width: `${Math.round(item.s)}%`
                            }}><span className="percens">{`${item.s} %`}</span></div>
                        </div>
                    </div>
                    : <></>
            }
        <section className="card-title h5">
                <h5>
                    <a
                        href={`/niab/${item.fod}`}
                        className="fond-link-src">
                        Фонд {item.fod}
                    </a>

                    <span className="copy-fond-icon" title="Скопировать ссылку на фонд" onClick={() => {
                        const copyLink = `${location.origin}${location.pathname}${item.fod}`;
                        try {
                            navigator.clipboard.writeText(copyLink);
                        } catch (err) {
                            console.error('Failed to copy: ', err);
                        }
                    }}>
                <svg x="0px" y="0px" height="10px" width="10px" viewBox="0 0 115.77 122.88">
                    <g>
                        <path className="st0"
                              d="M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02 v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02 c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1 c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7 h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65 v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02 v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z"/>
                    </g>
                </svg>
            </span>
                </h5>
                <div>
                    {isntZal ? <Badge bg="danger" pill><Link target="_blank"
                                                             href="https://niab.by/newsite/ru/Priostanovka_hkranilische4">Не
                        выдается c 01.10.2024</Link></Badge> : <></>}
                    {item.storage ? <Badge bg="light" pill text="dark">Хранилище №{item.storage}</Badge> : <></>}
                    {item.count ? <Badge bg="light" pill text="dark">{item.count} ед. хр.</Badge> : <></>}
                    {
                        item.lang?.map((ln: string) => <Badge key={ln} bg="light" pill text="dark">
                            {ln}
                        </Badge>)
                    }
                    {item.years ? <Badge bg="light" pill text="dark">{item.years}</Badge> : <></>}
                </div>
        </section>
        <section className="card-body">
                <Accordion activeKey={currentAccordion ?? ''} flush>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header
                            onClick={() => setCurrentAccordion((prevState: string) => prevState === '0' ? '' : '0')}><i>Название
                            фонда</i></Accordion.Header>
                        <Accordion.Body>
                            <div dangerouslySetInnerHTML={{__html: state.title}}/>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header
                            onClick={() => setCurrentAccordion((prevState: string) => prevState === '1' ? '' : '1')}><i>Аннотация
                            документов</i></Accordion.Header>
                        <Accordion.Body>
                            <div dangerouslySetInnerHTML={{__html: state.anotation}}/>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Button size="small"
                            variant="outlined"
                            className="fond-opis-button-src"
                            fullWidth={true}
                            startIcon="Описи"
                            endIcon={<ArrowForwardIosIcon/>}
                            href={`/niab/${item.fod}`}/>
                </Accordion>
        </section>
    </Card>
};

export default FondCard;

// https://niab.by/newsite/ru/Priostanovka_hkranilische4
const fourthStorage: any = {
    11: true,
    79: true,
    434: true,
    718: true,
    1170: true,
    1496: true,
    12: true,
    83: true,
    435: true,
    740: true,
    1175: true,
    1497: true,
    13: true,
    91: true,
    436: true,
    770: true,
    1179: true,
    1499: true,
    27: true,
    120: true,
    445: true,
    771: true,
    1181: true,
    1500: true,
    28: true,
    137: true,
    446: true,
    812: true,
    1186: true,
    1501: true,
    30: true,
    139: true,
    447: true,
    899: true,
    1192: true,
    1517: true,
    31: true,
    140: true,
    448: true,
    924: true,
    1194: true,
    1523: true,
    32: true,
    141: true,
    449: true,
    940: true,
    1197: true,
    1537: true,
    33: true,
    143: true,
    450: true,
    943: true,
    1214: true,
    1542: true,
    34: true,
    183: true,
    451: true,
    971: true,
    1218: true,
    1546: true,
    35: true,
    307: true,
    452: true,
    976: true,
    1229: true,
    1553: true,
    36: true,
    308: true,
    453: true,
    979: true,
    1231: true,
    1557: true,
    37: true,
    310: true,
    454: true,
    984: true,
    1285: true,
    1558: true,
    38: true,
    311: true,
    455: true,
    985: true,
    1311: true,
    1564: true,
    39: true,
    316: true,
    558: true,
    987: true,
    1312: true,
    1579: true,
    41: true,
    333: true,
    559: true,
    994: true,
    1348: true,
    1586: true,
    42: true,
    421: true,
    560: true,
    997: true,
    1359: true,
    1587: true,
    44: true,
    422: true,
    579: true,
    1006: true,
    1370: true,
    1589: true,
    46: true,
    423: true,
    582: true,
    1007: true,
    1388: true,
    1590: true,
    47: true,
    424: true,
    583: true,
    1011: true,
    1393: true,
    1591: true,
    48: true,
    425: true,
    621: true,
    1014: true,
    1406: true,
    1592: true,
    49: true,
    426: true,
    625: true,
    1015: true,
    1407: true,
    1593: true,
    50: true,
    427: true,
    627: true,
    1016: true,
    1413: true,
    1606: true,
    51: true,
    428: true,
    628: true,
    1034: true,
    1455: true,
    1677: true,
    52: true,
    429: true,
    629: true,
    1051: true,
    1461: true,
    1679: true,
    53: true,
    430: true,
    655: true,
    1125: true,
    1470: true,
    1680: true,
    55: true,
    431: true,
    656: true,
    1130: true,
    1475: true,
    1681: true,
    56: true,
    432: true,
    661: true,
    1131: true,
    1479: true,
    1952: true,
    63: true,
    433: true,
    680: true,
    1134: true,
    1492: true,
    1954: true,
    2301: true
};
