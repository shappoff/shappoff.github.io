'use client'

import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Link from "next/link";

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

export default function FondTabs({opisi}: any) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
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
    );
}
