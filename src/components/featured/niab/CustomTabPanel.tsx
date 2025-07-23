'use client'

import * as React from 'react';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import {Chip} from "@mui/material";
import WrapToTooltip from "@/components/featured/niab/BasicTooltip";

function compareDelaNumbers(a: any, b: any) {
    return +a.delo.replace(/[^0-9]/g, '') - +b.delo.replace(/[^0-9]/g, '');
}

export default function BasicTabs({digitedPosts}: any) {
    const opisi: any = {};
    Object.keys(digitedPosts || {}).forEach((opis: any) => {
        const delaObj = digitedPosts[opis];
        Object.keys(delaObj || {}).forEach((delo: string) => {
            const comment = digitedPosts[opis][delo];
            if (opisi[opis]) {
                opisi[opis].push({delo, comment});
            } else {
                opisi[opis] = [{delo, comment}]
            }
        });
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
                                        .sort(compareDelaNumbers)
                                        .map(({delo, comment}: any, indexD: number) => {
                                            return <div key={indexD} style={{margin: '0 10px'}}>
                                                <WrapToTooltip note={comment}>
                                                    <Chip sx={{margin: 1, cursor: 'pointer', color: comment?'blue':'black'}} label={comment ? <u>№{delo}</u> : <span>№{delo}</span>} variant="outlined" />
                                                </WrapToTooltip>
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
