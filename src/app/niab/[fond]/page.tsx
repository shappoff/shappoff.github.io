import Link from "next/link";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import MainTabsOpisi from "@/components/featured/niab/MainTabsOpisi";
import fs from "fs";
import HomeIcon from '@mui/icons-material/Home';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from "react";
import Tooltip from '@mui/material/Tooltip';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import LaunchIcon from '@mui/icons-material/Launch';

import {
    digitedFormattedDataPath,
    indexedNIABDataPath,
    mainFODDataPath,
    rejectedFormattedPath,
    statistics333projectPath
} from "@/components/paths";
import GAnalitycs from "@/components/featured/niab/GAnalitycs";

export async function generateStaticParams() {
    const stPropsArr: Array<any> = [];
    const allPosts = JSON.parse(fs.readFileSync(mainFODDataPath, 'utf8'));
    allPosts.forEach(({fod}: any) => {
        stPropsArr.push({fond: `${fod}`});
    })

    return stPropsArr;
}

export async function generateMetadata({ params }: any) {
    const {fond} = await params;
    const allPosts = JSON.parse(fs.readFileSync(mainFODDataPath, 'utf8'));

    const currentItem = allPosts.find((item: any) => +item.fod === +fond || item.fod === fond) || {};

    return {
        title: `${currentItem.fod} | ${currentItem.title}`,
        description: currentItem.anotation,
        icons: [
            {
                url: '/niab/favicon.ico',
                type: 'image/x-icon',
                sizes: 'any',
                rel: 'icon'
            }
        ],
    }
}

const FondPage = async ({params}: any) => {
    const {fond} = await params;
    const allPosts = JSON.parse(fs.readFileSync(mainFODDataPath, 'utf8'));
    const rejectedPosts = JSON.parse(fs.readFileSync(rejectedFormattedPath, 'utf8'));
    const digitedFormattedData = JSON.parse(fs.readFileSync(digitedFormattedDataPath, 'utf8'));
    const indexedNIABData = JSON.parse(fs.readFileSync(indexedNIABDataPath, 'utf8'));
    const d333Posts = JSON.parse(fs.readFileSync(statistics333projectPath, 'utf8'));
    const currentItem = allPosts.find((item: any) => +item.fod === +fond || item.fod === fond) || {};
    const opNmbPool: any = {};
    currentItem.opisi.forEach(({opNmb}: any) => {
        if (opNmb) {
            opNmbPool[opNmb] = true;
        }
    });

// https://niab.by/newsite/ru/Priostanovka_hkranilische4
    const isntZal: any = !!fourthStorage[fond];
    return <>
        <GAnalitycs fond={fond} />
        <Box sx={{flexGrow: 1, margin: 3}}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link href="/">
                    <HomeIcon />
                </Link>
                <Link href="/niab">
                    Фонды НИАБ
                </Link>
                <Link target="_blank" href={currentItem.fodlink} style={{position: 'relative'}}>
                    ф.{fond} <LaunchIcon sx={{ fontSize: 10, top: -3, position: 'absolute' }} />
                </Link>

            </Breadcrumbs>
            <Stack
                sx={{
                    marginTop: '1rem',
                    flexDirection: 'row',
                    flexWrap: 'wrap'
                }}
            >
                {
                    currentItem.count ? <Chip label={currentItem.count + ' ед. хр.'} size="small" /> : <></>
                }
                {
                    currentItem.years ? <Chip label={currentItem.years} size="small" /> : <></>
                }
                {
                    currentItem.lang ?
                        currentItem.lang.map((lang: string, index: number) => <Chip key={index} label={lang} size="small" />)
                        : <></>
                }
                {
                    currentItem.storage ? <Chip label={'Хранилище № ' + currentItem.storage} size="small" /> : <></>
                }
                {
                    +fond === 333 ? <>
                        <Link href="https://forum.vgd.ru/post/45/93243/p2043735.htm#pp2043735" target="_blank">
                            <Tooltip title="Проект создания описи фонда 333">
                                <Chip label="Опись 333-9" size="small" sx={{textDecoration: 'underline'}} />
                            </Tooltip>
                        </Link>
                    </> : <></>
                }
                {
                    currentItem.s ? <>
                        <Link href="https://forum.vgd.ru/post/468/118798/p3690535.htm#pp3690535" target="_blank">
                            <Tooltip title="Индексация описей фондов НИАБ (Минск). Волонтерская инициатива. Присоединяйтесь к нашему проекту! Принять участие смогут все желающие">
                                <Chip label={'Проиндексированно: ' + currentItem.s + '%'} size="small" sx={{textDecoration: 'underline'}} />
                            </Tooltip>
                        </Link>
                    </> : <></>
                }

                {isntZal ?
                    <Tooltip title="Уважаемые пользователи читальных залов! С 01.10.2024 по техническим причинам временно приостанавливается выдача в читальный зал комплекса фондов из архивохранилища №4">
                        <Link target="_blank" href="https://niab.by/newsite/ru/Priostanovka_hkranilische4">
                            <Chip color="error" label="Не выдается c 01.10.2024" size="small" sx={{textDecoration: 'underline'}} />
                        </Link></Tooltip>
                    : <></>}
            </Stack>
            <Accordion sx={{ marginTop: '1rem' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <h1>Фонд {currentItem.fod} {currentItem.title}</h1>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid size={{xs: 12, md: 12}}>
                            <p>{currentItem.anotation}</p>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            {
                +fond === 333 ? <>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel3-content"
                            id="panel3-header"
                        >
                            <h3>Проект создания описи по 333</h3>
                        </AccordionSummary>
                        <AccordionDetails>
                            <u><Link href="https://forum.vgd.ru/post/45/93243/p2043735.htm#pp2043735" target="_blank">Описание проекта</Link></u>
                            <Paper sx={{width: '100%', overflow: 'auto'}}>
                                <TableContainer sx={{ maxHeight: 600 }}>
                                    <Table stickyHeader sx={{ minWidth: 650 }} size="small" aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                {
                                                    d333Posts[0].map((h: any, index: number) => {
                                                        return <TableCell key={index} align="center">{h}</TableCell>
                                                    })
                                                }
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {d333Posts?.map((row: any, index: number) => index ? (
                                                <TableRow
                                                    key={index}
                                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                                >
                                                    <TableCell align="center">{row[0]}</TableCell>
                                                    <TableCell align="center">{row[1]}</TableCell>
                                                    <TableCell align="center">{row[2]}</TableCell>
                                                    <TableCell align="center">{row[3]}</TableCell>
                                                    <TableCell align="center">{row[4]}</TableCell>
                                                    <TableCell align="center">{row[5]}</TableCell>
                                                    <TableCell align="center">{row[6]}</TableCell>
                                                    <TableCell align="center">{row[7]}</TableCell>
                                                    <TableCell align="center">{row[8]}</TableCell>
                                                    <TableCell align="center">{row[9]}</TableCell>
                                                </TableRow>
                                            ) : '')}
                                        </TableBody>

                                    </Table>
                                </TableContainer>
                            </Paper>
                        </AccordionDetails>
                    </Accordion>
                </> : <></>
            }
            <MainTabsOpisi
                fond={fond}
                rejected={rejectedPosts[fond] || {}}
                opNmbPool={Object.keys(opNmbPool)}
                digited={digitedFormattedData[fond] || {}}
                indexed={indexedNIABData[fond] || {}}
                opisi={currentItem.opisi || []}
            />

        </Box>
    </>
};

export default FondPage;

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
