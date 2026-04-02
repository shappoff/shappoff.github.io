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
import fifthStorageSet from "@/components/featured/niab/fifthStorage";

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
    const isntZal: any = !!fifthStorageSet.has(Number(fond));
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
                    <Tooltip title="Не выдается в читальный зал">
                        <Link target="_blank" href="https://niab.by/newsite/ru/Priostanovka_hkranilische4">
                            <Chip color="error" label="Не выдается в читальный зал" size="small" sx={{textDecoration: 'underline'}} />
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

