'use client'

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Button from '@mui/material/Button';
import HomeIcon from "@mui/icons-material/Home";
import { useRouter, usePathname } from 'next/navigation'

const navigationValueFromPathname = (pathname: string) => {
    if (pathname.startsWith('/catalogarchivesgov/smolensk')) {
        return '/catalogarchivesgov/smolensk/';
    }
    if (pathname.startsWith('/catalogarchivesgov')) {
        return '/catalogarchivesgov/';
    }
    return '/';
};

export default function NavigationMenu() {
    const router = useRouter();
    const pathname = usePathname();

    const navValue = navigationValueFromPathname(pathname);

    return (
        <BottomNavigation
            sx={{ maxHeight: '2rem' }}
            showLabels
            value={navValue}
            onChange={(event, newValue) => {
                router.push(newValue);
            }}
        >
            <BottomNavigationAction
                icon={<HomeIcon fontSize="small" />}
                value="/"
            />
            <BottomNavigationAction
                label="Беларусь"
                showLabel={true}
                value="/catalogarchivesgov/"
                component={Button}
            />
            <BottomNavigationAction
                label="Смоленск"
                showLabel={true}
                value="/catalogarchivesgov/smolensk/"
                component={Button}
            />
        </BottomNavigation>
    );
}
