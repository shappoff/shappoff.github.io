'use client'

import * as React from 'react';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import {Chip} from "@mui/material";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{p: 3}}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs({digitedPosts}: any) {
    const opisi: any = {};
    digitedPosts.forEach((dItem: any) => {
        const [fond, opis, delo] = dItem;
        if (opisi[opis]) {
            opisi[opis].push(delo);
        } else {
            opisi[opis] = [delo]
        }
    });
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{width: '100%'}}>
            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChange} aria-label="Список описей" variant="scrollable" scrollButtons="auto">
                        {
                            Object.keys(opisi)
                                .map((opNmb: string, index: number) => {
                                    return <Tab key={index} label={`Опись ${opNmb}`} value={index}/>
                                })
                        }
                    </TabList>
                </Box>
                {
                    opisi ? Object.keys(opisi)
                        .map((opNmb: string, index: number) => {
                            return <TabPanel key={index}
                                             sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', padding: 0}}
                                             value={index}>
                                {
                                    opisi[opNmb] ? Object.values(opisi[opNmb])
                                        .map((delo: any, indexD: number) => {
                                            return <div key={indexD} style={{margin: '0 10px'}}>
                                                <Chip label={`№${delo}`} variant="outlined" />
                                            </div>
                                        }) : <></>
                                }
                            </TabPanel>
                        }) : <></>
                }
            </TabContext>
        </Box>
    );
}
