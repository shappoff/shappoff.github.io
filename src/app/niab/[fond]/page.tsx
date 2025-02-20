import {getGoogleSheetsData} from "@/components/gsheets";
import Link from "next/link";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import FondTabs from "@/components/niab/FondTabs";
// import { unstable_cache } from 'next/cache';
// import { cache } from 'react';

/*
export const getNIABFonds = cache(
    async () => {
        return await getGoogleSheetsData('main!A2:O', '1Rk81HuByagjWntIrCe_8FKYM9_LDHfOX--i0n_3YhqE') || [];
    });
*/

/*
export const getNIABFonds = unstable_cache(
    async () => {
        return await getGoogleSheetsData('main!A2:O', '1Rk81HuByagjWntIrCe_8FKYM9_LDHfOX--i0n_3YhqE') || [];
    },
    ['posts'],
    { revalidate: 10, tags: ['posts'] }
);

*/

export async function generateStaticParams() {
    const stPropsArr: Array<any> = [];

    for (let i = 1; i <= 3472; i++) {
        stPropsArr.push({fond: `${1}`});
    }


    return stPropsArr;
}

/*
export async function generateMetadata({ params }: any) {
    const {fond} = await params;
    const allPosts = await getGoogleSheetsData('main!A2:O', '1Rk81HuByagjWntIrCe_8FKYM9_LDHfOX--i0n_3YhqE') || [];
    const currentFOND = [];
    let currentFONDAbout: any = {};
    for (const row of allPosts) {
        const [fod, fodFull, fodlink, title, anotation, op, count, lang, oplink, internal, note, years, opNmb, store, storeNote] = row;
        if (+fod === +fond) {
            currentFONDAbout = {fodFull, fodlink, title, anotation};
            currentFOND.push({op, count, lang, oplink, internal, note, years, opNmb, store, storeNote});
        }
        if (+fod > +fond) {
            break;
        }
        if (currentFOND.length && !fod) {
            currentFOND.push({op, count, lang, oplink, internal, note, years, opNmb, store, storeNote});
        }
    }

    return {
        title: `${currentFONDAbout.fodFull} | ${currentFONDAbout.title}`,
        description: currentFONDAbout.anotation,
    }
}
*/

const FondPage = async ({params}: any) => {
    const {fond} = await params;
    const allPosts = await getGoogleSheetsData('main!A2:O', '1Rk81HuByagjWntIrCe_8FKYM9_LDHfOX--i0n_3YhqE') || [];

    const currentFOND = [];
    let currentFONDAbout: any = {};
    for (const row of allPosts) {
        const [fod, fodFull, fodlink, title, anotation, op, count, lang, oplink, internal, note, years, opNmb, store, storeNote] = row;
        if (+fod === +fond) {
            currentFONDAbout = {fodFull, fodlink, title, anotation};
            currentFOND.push({op, count, lang, oplink, internal, note, years, opNmb, store, storeNote});
        }
        if (+fod > +fond) {
            break;
        }
        if (currentFOND.length && !fod) {
            currentFOND.push({op, count, lang, oplink, internal, note, years, opNmb, store, storeNote});
        }
    }

    return <>
        <Box sx={{flexGrow: 1, margin: 3}}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link href="/niab">
                    Фонды НИАБ
                </Link>
                <Link href={`/niab/${fond}`}>
                    {fond}
                </Link>
            </Breadcrumbs>
            <Grid container spacing={2}>
                <Grid size={{xs: 4, md: 3}}>
                    <h1>
                        <Link target="_blank" href={currentFONDAbout.fodlink}>{currentFONDAbout.fodFull}</Link>
                    </h1>
                </Grid>
                <Grid size={{xs: 8, md: 9}}>
                    <h2>{currentFONDAbout.title}</h2>
                </Grid>
                <Grid size={{xs: 12, md: 12}}>
                    <p>{currentFONDAbout.anotation}</p>
                </Grid>
            </Grid>
            <FondTabs opisi={currentFOND} />
        </Box>
    </>
};

export default FondPage;
