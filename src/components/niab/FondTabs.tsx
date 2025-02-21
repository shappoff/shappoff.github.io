'use client'

import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Link from "next/link";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function FondTabs({opisi, rejectedItems}: any) {
    const [value, setValue] = React.useState(0);
    const [expanded, setExpanded] = React.useState<string | false>('');

    const handleExpand =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => setValue(newValue);

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
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: '96vh' }}>
                            <Table sx={{ minWidth: 650 }} size="small" stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Фонд</TableCell>
                                        <TableCell align="center">Опись</TableCell>
                                        <TableCell align="center">№ Дела</TableCell>
                                        <TableCell align="center">Заголовок дела</TableCell>
                                        {/*<TableCell align="center">{'header[4]'}</TableCell>*/}
                                        {/*<TableCell align="center">{'header[5]'}</TableCell>*/}
                                        <TableCell align="center">Причина</TableCell>
                                        {/*<TableCell align="center">{'header[7]'}</TableCell>*/}
                                        {/*<TableCell align="center">{'header[8]'}</TableCell>*/}
                                        <TableCell align="center">контактное лицо</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rejectedItems.map((row: any, index:  number) => index ? (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">{row[0]}</TableCell>
                                            <TableCell align="center">{row[1]}</TableCell>
                                            <TableCell align="center">{row[2]}</TableCell>
                                            <TableCell align="left">{row[3]}</TableCell>
                                            {/*<TableCell align="left">{row[4]}</TableCell>*/}
                                            {/*<TableCell align="left">{row[5]}</TableCell>*/}
                                            <TableCell align="left">{row[6]}</TableCell>
                                            {/*<TableCell align="left">{row[7]}</TableCell>*/}
                                            {/*<TableCell align="left">{row[8]}</TableCell>*/}
                                            <TableCell align="left">{row[9]}</TableCell>
                                        </TableRow>
                                    ) : '')}
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
                <AccordionDetails>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="Описи фонда" variant="scrollable" allowScrollButtonsMobile={true}>
                                {
                                    opisi.map(({op, count, lang, oplink, internal, note, years, opNmb, store, storeNote}: any, index: number) => {
                                        return <Tab key={index} label={op} {...a11yProps(index)} />
                                    })
                                }
                            </Tabs>
                        </Box>
                        {
                            opisi.map(({op, count, lang, oplink, internal, note, years, opNmb, store, storeNote}: any, index: number) => {
                                return <CustomTabPanel key={index} value={value} index={index}>
                                    <Link href={oplink}>{op}</Link>
                                </CustomTabPanel>
                            })
                        }

                    </Box>
                </AccordionDetails>
            </Accordion>

        </>

    );
}
