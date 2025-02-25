import Link from "next/link";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import FondTabs from "@/components/niab/FondTabs";
import path from "path";
import fs from "fs";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const targetNIAB = path.resolve(`public/niab/data.json`);
const rejectedPath = path.resolve(`public/niab/rejected.json`);
const digitedPath = path.resolve(`public/niab/digited.json`);

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
        icons: [
            {
                url: 'niab/favicon.ico',
                type: 'image/x-icon',
                sizes: 'any',
                rel: 'icon'
            }
        ],
    }
}

const FondPage = async ({params}: any) => {
    const {fond} = await params;
    const allPosts = JSON.parse(fs.readFileSync(targetNIAB, 'utf8'));
    const rejectedPosts = JSON.parse(fs.readFileSync(rejectedPath, 'utf8'));
    const digitedPosts = JSON.parse(fs.readFileSync(digitedPath, 'utf8'));
    const rejectedItems = rejectedPosts.filter((rejected: any) => +rejected[0] === +fond);
    const digitedItems = digitedPosts.filter((digited: any) => +digited[0] === +fond);
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
                    ф.{fond}
                </Link>
            </Breadcrumbs>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <h1>{currentFONDAbout.fodFull} {currentFONDAbout.title}</h1>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid size={{xs: 12, md: 12}}>
                            <p>{currentFONDAbout.anotation}</p>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>


            <FondTabs digitedPosts={digitedItems} rejectedItems={rejectedItems} opisi={currentFOND} />
        </Box>
    </>
};

export default FondPage;
