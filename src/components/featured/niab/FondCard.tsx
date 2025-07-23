import React from "react";
import Card from '@mui/material/Card';

import Link from "next/link";
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styled from 'styled-components';
import CardBody from "@/components/featured/niab/CardBody";

import './FondCard.css';
import LaunchIcon from "@mui/icons-material/Launch";

type ProgressLineType = {
    $content: number
};

const ProgressLine = styled.progress<ProgressLineType>`
  position: relative;
  height: 10px;
  margin: 3px 6px;
  width: 97%;
`;

const LabelProgressLine = styled.label`
  display: inline-block;
  background-color: #ffffff;
  border-radius: 4px;
  color: #0063B1;
  padding: 3px 6px;
  font-size: 0.6rem;
  font-weight: 500;
  position: relative;
  width: fit-content;
  bottom: 20px;
  left: 36%;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);

  opacity: 0;
  transform: scale(0);
  transition: 0.3s;

  .card:hover &,
  .card:focus &,
  .card:focus-visible & {
    opacity: 1;
    transform: scale(1);
  }
`;

type BadgeType = {
    $pill: boolean;
    $bg: string;
};

const Badge = styled.span<BadgeType>`
  font-size: 10px;
  ${(props) => props.$pill && 'border-radius: 50rem;'}
  border-radius: 50rem;
  background-color: ${(props) => props.$bg === 'danger' ? 'rgba(220, 53, 69, 1)' : 'rgba(248, 249, 250, 1)'};
  color: ${(props) => props.$bg === 'danger' ? '#ffffff' : 'rgba(33, 37, 41, 1)'};
  display: inline-block;
  padding: 0.2rem 0.65rem;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  box-sizing: border-box;
  margin: 0;

  & a {
    color: ${(props) => props.$bg === 'danger' ? '#ffffff' : 'rgba(33, 37, 41, 1)'};
  }
`;

export type StateType = {
    isTitle?: boolean
    isAnotation?: boolean
    title: string
    anotation: string
};

const FondCard = ({item, index}: any) => {

    // https://niab.by/newsite/ru/Priostanovka_hkranilische4
    const isntZal: any = !!fourthStorage[item.fod];

    const styleAnimationDelay = index < 12 ? {animationDelay: `${index * 50}ms`} : {animationDelay: `${index + 600}ms`};

    return <Card className="card" key={item.objectID} style={styleAnimationDelay}>
        <section className="progress-line-section">
            {
                item.s ?
                    <>
                        <ProgressLine id={item.objectID} max="100" value={item.s} $content={item.s} />
                        <LabelProgressLine htmlFor={item.objectID}>Проиндексирован на {item.s} %</LabelProgressLine>
                    </>
                    : <></>
            }
        </section>

        <section className="card-title-section">
            <h5>
                <a
                    target="_blank"
                    href={item.fodlink}
                    className="fond-link-src">
                    Ф.{item.fod}
                    <sup>
                        <LaunchIcon sx={{ fontSize: 10, top: -4, position: 'relative' }} />
                    </sup>
                </a>
            </h5>
            <div className="card-title-section-info">
                {isntZal ? <Badge $bg="danger" $pill={true}><Link target="_blank"
                                                                  href="https://niab.by/newsite/ru/Priostanovka_hkranilische4">Не
                    выдается c 01.10.2024</Link></Badge> : <></>}
                {item.storage ? <Badge $bg="light" $pill={true}>Хранилище №{item.storage}</Badge> : <></>}
                {item.count ? <Badge $bg="light" $pill={true}>{item.count} ед. хр.</Badge> : <></>}
                {
                    item.lang?.map((ln: string) => <Badge key={ln} $bg="light" $pill={true}>
                        {ln}
                    </Badge>)
                }
                {item.years ? <Badge $bg="light" $pill={true}>{item.years}</Badge> : <></>}
            </div>
        </section>
        <section className="card-body-section">
            <CardBody item={item}/>
        </section>
        <section className="card-footer-section">
            <Link href={`/niab/${item.fod}`}>
                <Button size="small"
                        variant="outlined"
                        className="fond-opis-button-src"
                        fullWidth={true}
                        startIcon="Описи"
                        endIcon={<ArrowForwardIosIcon/>} />
            </Link>
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
