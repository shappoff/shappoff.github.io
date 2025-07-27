import * as React from "react";
import HomeButton from "@/components/shared/HomeButton";
import Button from '@mui/material/Button';
import Link from 'next/link'
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import MapWrapper from "@/components/featured/catalogarchivesgov/MapWrapper";

export default function Layout({ children }: any) {
    return (
        <>
            <Stack
                spacing={1}
                useFlexGap={true}
                direction="row"
                sx={{position: 'absolute', top: 0, left: 0, zIndex: 999}}
                divider={<Divider orientation="vertical" flexItem />}

            >
                <HomeButton absolute={false} variant={true}/>
                <Link href="/catalogarchivesgov">
                    <Button
                        variant="contained"
                        size="small"
                    >
                        Беларусь
                    </Button>
                </Link>
                <Link href="/catalogarchivesgov/smolensk">
                    <Button
                        variant="contained"
                        size="small"
                    >
                        Смоленск
                    </Button>
                </Link>
            </Stack>
            <MapWrapper>{children}</MapWrapper>

        </>
    )
}
