'use client'

import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Button from '@mui/material/Button';
import HomeIcon from "@mui/icons-material/Home";
import { useRouter, usePathname } from 'next/navigation'

export default function NavigationMenu() {
    const router = useRouter();
    const pathname = usePathname()

    const [value, setValue] = React.useState(pathname);

    const isSelected = (value: string) => {
        return {
            classes: {
                root: pathname === value ? 'Mui-selected' : ''
            }
        };
    };

    return (
        <BottomNavigation
            sx={{ maxHeight: '2rem' }}
            showLabels
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
        >
            <BottomNavigationAction
                icon={<HomeIcon fontSize="small" />}
                onClick={() => router.push('/')}
                value="/"
            />
            <BottomNavigationAction
                label="Беларусь"
                showLabel={true}
                onClick={() => router.push('/catalogarchivesgov')}
                value="catalogarchivesgov"
                component={Button}
                {...isSelected('/catalogarchivesgov/')}
            />
            <BottomNavigationAction
                label="Смоленск"
                onClick={() => router.push('/catalogarchivesgov/smolensk')}
                value="catalogarchivesgov/smolensk"
                showLabel={true}
                component={Button}
                {...isSelected('/catalogarchivesgov/smolensk/')}
            />
        </BottomNavigation>
    );
}
