'use client'

import React from "react";
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Box from '@mui/material/Box';
import OpisCard from "@/components/featured/niab/OpisCard";
import WrapToTooltip from "@/components/featured/niab/BasicTooltip";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from "next/link";
import {Alert} from "@mui/material";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import './MainTabsOpisi.css'
import CopyToClipboardData from "@/components/shared/CopyToClipboardData";
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { sendGAEvent } from '@next/third-parties/google';

function compareDelaNumbers(a: any, b: any) {
    return +a.replace(/[^0-9]/g, '') - +b.replace(/[^0-9]/g, '');
}

const MainTabsOpisi = ({fond, opNmbPool, digited, opisi, rejected, indexed}: any) => {

    const [value, setValue] = React.useState<number>(1);

    React.useEffect(() => {
        sendGAEvent('event', 'search', { fond: `${fond}` });
    }, []);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return <React.Fragment>
        <Box sx={{width: '100%'}}>


            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChange} aria-label="Список описей" variant="scrollable"
                             scrollButtons="auto">
                        {
                            opNmbPool
                                .map((opNmb: string, index: number) => {
                                    return <Tab key={index} label={`Опись ${opNmb}`} value={+opNmb}/>
                                })
                        }
                    </TabList>
                    {
                        opNmbPool
                            .map((opNmb: number, index: number) => {
                                return <TabPanel key={index}
                                                 sx={{
                                                     display: 'flex',
                                                     flexWrap: 'wrap',
                                                     justifyContent: 'flex-start',
                                                     padding: 0
                                                 }}
                                                 value={+opNmb}>
                                    {
                                        indexed[value] ? <>
                                            <Divider sx={{width: '100%', margin: '10px 0'}} textAlign="center">
                                                <WrapToTooltip note="О проекте | Откроется в новом окне">
                                                    <Link target="_blank" href="https://forum.vgd.ru/post/468/118798/p3690535.htm#pp3690535">
                                                        <u>
                                                            <h4>Опись № {value}, проиндексирована на {indexed[value]}</h4>
                                                        </u>
                                                    </Link>
                                                </WrapToTooltip>
                                            </Divider>
                                        </> : <></>
                                    }
                                    {
                                        Object.keys(rejected[value] || {}).length ? <>
                                            <Accordion sx={{ marginTop: '1rem', width: '100%' }}>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel2-content"
                                                    id="panel2-header"
                                                >
                                                    <h4>Информация об отказах в выдаче дел</h4>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                                        <Alert severity="info">
                                                            <b>Если вам отказали в выдаче дела, сообщите об этом пожалуйста - </b>
                                                            <Link href={`mailto:ilasica@internet.ru`}>ilasica@internet.ru</Link>
                                                        </Alert>
                                                        <TableContainer>
                                                            <Table size="small" stickyHeader aria-label="sticky table">
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell align="center">№ Дела</TableCell>
                                                                        <TableCell align="center">Заголовок дела</TableCell>
                                                                        <TableCell align="center">Причина</TableCell>
                                                                        <TableCell align="center">контактное лицо</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {Object.keys(rejected[value] || {}).map((delo: string, index:  number) => {
                                                                        const [title, reason, contact] = rejected[value][delo] || [];
                                                                        return <TableRow
                                                                            key={index}
                                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                        >
                                                                            <TableCell align="center">№ {delo}</TableCell>
                                                                            <TableCell align="left">{title}</TableCell>
                                                                            <TableCell align="center">{reason}</TableCell>
                                                                            <TableCell align="center"><Link href={`mailto:${contact}`}>{contact}</Link></TableCell>
                                                                        </TableRow>
                                                                    })}
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </Paper>
                                                </AccordionDetails>
                                            </Accordion>

                                        </> : <></>
                                    }


                                    <section style={{
                                        display: 'flex',
                                        overflowX: 'auto',
                                        width: '100vw'}}>
                                        {
                                            opisi.map((opis: any, index: number) => {
                                                return opis.opNmb === opNmb && opis.docId ?
                                                    <OpisCard key={index} info={opis} /> :
                                                    <React.Fragment key={index}></React.Fragment>
                                            })
                                        }
                                    </section>

                                    <section style={{display: 'flex', flexWrap: 'wrap', width: '100vw'}}>
                                        {
                                            Object.keys(digited[opNmb] || {}).length ? <>
                                                <Divider sx={{width: '100%', margin: '10px 0'}} textAlign="center">
                                                    <WrapToTooltip note="обновлено 01.10.2025 | Таблица откроется в новом окне">
                                                        <Link target="_blank" href="https://docs.google.com/spreadsheets/d/1l2kGIHYlz6G8tD6xtqSI_SSf1U3a62Wt">
                                                            <u>
                                                                <h4>Оцифрованные дела Описи № {value}</h4>
                                                            </u>
                                                        </Link>
                                                    </WrapToTooltip>
                                                </Divider>
                                            </> : <></>
                                        }
                                        <div className="digeted-box-ul">
                                            {
                                                Object.keys(digited[opNmb] || {})
                                                    .sort(compareDelaNumbers)
                                                    .map((deloNmb: string, indexDelo) => {
                                                        let comment = digited[opNmb][deloNmb];
                                                        comment = comment === true ? null : comment;
                                                        return <>
                                                            <WrapToTooltip key={indexDelo} note={comment}>
                                                                <Button key={indexDelo}
                                                                        startIcon={'№'}
                                                                        endIcon={<CopyToClipboardData data={`НИАБ ${fond}-${opNmb}-${deloNmb}`} withSnackbar={true} />}
                                                                        variant="outlined"
                                                                        sx={{
                                                                            cursor: 'default',
                                                                            color: comment ? 'blue' : 'black'
                                                                            }}>
                                                                    {comment ? <u>{deloNmb}</u> : <span>{deloNmb}</span>}
                                                                </Button>
                                                            </WrapToTooltip>
                                                        </>
                                                    })
                                            }
                                        </div>

                                    </section>
                                </TabPanel>
                            })
                    }
                </Box>

            </TabContext>
        </Box>

    </React.Fragment>
};

export default MainTabsOpisi;
