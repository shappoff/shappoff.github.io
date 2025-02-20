import Link from "next/link";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import FondTabs from "@/components/niab/FondTabs";
import path from "path";
import fs from "fs";

const targetNIAB = path.resolve(`public/niab/data.json`);

export async function generateStaticParams() {
    const stPropsArr: Array<any> = [];
    const allPosts = JSON.parse(fs.readFileSync(targetNIAB, 'utf8'));
    allPosts.forEach(([fond]: any) => {
        if (fond && !isNaN(+fond)) {
            stPropsArr.push({fond: `${fond}`});
        }
    })

    return stPropsArr;
}

export async function generateMetadata({ params }: any) {
    const {fond} = await params;
    const allPosts = JSON.parse(fs.readFileSync(targetNIAB, 'utf8'));
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

const FondPage = async ({params}: any) => {
    const {fond} = await params;
    const allPosts = JSON.parse(fs.readFileSync(targetNIAB, 'utf8'));

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
