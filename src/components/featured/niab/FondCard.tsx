import React from "react";
import Card from '@mui/material/Card';

import Link from "next/link";
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styled from 'styled-components';
import CardBody from "@/components/featured/niab/CardBody";

import './FondCard.css';
import LaunchIcon from "@mui/icons-material/Launch";
import fifthStorageSet from "./fifthStorage";

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
    const isntZal: any = !!fifthStorageSet.has(Number(item.fod));

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
                    выдается в читальный зал</Link></Badge> : <></>}
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
