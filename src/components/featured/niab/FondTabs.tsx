'use client'

import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OpisCard from "@/components/featured/niab/OpisCard";
import Link from "next/link";
import {Alert} from "@mui/material";
import BasicTabs from "@/components/featured/niab/CustomTabPanel";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function compareNumbers(a: string, b: string) {
    return +a[1] - +b[1] || +a[2].replace(/\D/g,'') - +b[2].replace(/\D/g,'');
}
export default function FondTabs({opisi, rejectedItems, digitedPosts}: any) {
    const [expanded, setExpanded] = React.useState<string | false>('');

    const handleExpand =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    return (
        <>
            <Accordion expanded={expanded === 'panel1'} onChange={handleExpand('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                >
                    <h3>Дела фонда отказанные в выдаче</h3>
                </AccordionSummary>
                <AccordionDetails>
                    <Alert severity="info">
                        <b>Если вам отказали в выдаче дела, сообщите об этом пожалуйста - </b>
                        <Link href={`mailto:ilasica@internet.ru`}>ilasica@internet.ru</Link>
                    </Alert>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer>
                            <Table size="small" stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Фонд-Опись-Дело</TableCell>
                                        <TableCell align="center">Заголовок дела</TableCell>
                                        <TableCell align="center">Причина</TableCell>
                                        <TableCell align="center">контактное лицо</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rejectedItems.sort(compareNumbers).map((row: any, index:  number) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center">{row[0]}-{row[1]}-{row[2]}</TableCell>
                                            <TableCell align="left">{row[3]}</TableCell>
                                            <TableCell align="center">{row[6]}</TableCell>
                                            <TableCell align="center"><Link href={`mailto:${row[9]}`}>{row[9]}</Link></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </AccordionDetails>
                </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleExpand('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <h3>Описи PDF</h3>
                </AccordionSummary>
                <AccordionDetails sx={{display: 'flex', flexWrap: 'wrap'}}>
                    {
                        opisi.map((opis: any, index: number) => {
                            return <OpisCard key={index} info={opis} />
                        })
                    }
                </AccordionDetails>
            </Accordion>
            { Object.keys(digitedPosts || {}).length > 0 ? <Accordion expanded={expanded === 'panel3'} onChange={handleExpand('panel3')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel3-content"
                    id="panel3-header"
                >
                    <h3>Оцифрованные дела фонда</h3>
                </AccordionSummary>
                <AccordionDetails>
                    <BasicTabs digitedPosts={digitedPosts} />
                </AccordionDetails>
            </Accordion> : <></>}

        </>

    );
}
