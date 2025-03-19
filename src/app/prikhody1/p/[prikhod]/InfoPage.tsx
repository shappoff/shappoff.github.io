'use client'

import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {useRouter} from 'next/navigation'
import {Button, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import LinkIcon from '@mui/icons-material/Link';
import React from "react";
import Link from "next/link";
import CreatePortalWrapper from "@/components/CreatePortalWrapper";
import Box from '@mui/material/Box';
import './InfoPage.css';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tooltip from '@mui/material/Tooltip';
import useFirebaseAuth from "@/components/prikhody/useFirebaseAuth";
import {getDatabase, ref} from "firebase/database";
import {useList} from "react-firebase-hooks/database";
import NPPlaceMarker from "@/components/prikhody/NPPlaceMarker";
import SendArchivesData from "@/app/prikhody1/p/[prikhod]/SendArchivesData";
import useMarkersBounds from "@/components/prikhody/useMarkersBounds";
import BoundsToMapItems from "@/components/prikhody/BoundsToMapItems";

const InfoPage = ({archives, prikhod}: any) => {
    const [objectID, title, pTitle, pType, lat, lng, src, atd] = prikhod;
    const router = useRouter();
    const app = useFirebaseAuth();
    const [snapshots, loading, error] = useList(ref(getDatabase(app), `prikhods/${objectID}`));
    const [show, setShow] = React.useState<boolean>(true);
    const [value, setValue] = React.useState<number>(1);
    const [currentDescriptionItem, setCurrentDescriptionItem] = React.useState<any>();
    const [currentPrikhodNPs, setCurrentPrikhodNPs] = React.useState<any>([]);
    const [currentNotFoundPrikhodNPs, setCurrentNotFoundPrikhodNPs] = React.useState<any>([]);

    React.useEffect(() => {
        const found: Array<any> = [];
        const notFound: Array<any> = [];
        currentDescriptionItem?.nps?.map((value: any) => {
            if (value.coords?.length) {
                found.push(value);
            } else {
                notFound.push(value);
            }
            return value;
        });
        setCurrentNotFoundPrikhodNPs(notFound);
        setCurrentPrikhodNPs(found);

    }, [currentDescriptionItem]);

    React.useEffect(() => {
        const vvv = snapshots?.reduce((previousValue: any, currentValue: any) => {
            previousValue[currentValue.key] = currentValue.val();
            return previousValue;
        }, {});
        setCurrentDescriptionItem(vvv);
    }, [snapshots]);

    const markersBounds = useMarkersBounds(currentPrikhodNPs);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const goBack = () => {
        if (history.length > 2) {
            router.back();
        } else {
            router.push('/prikhody1')
        }
    };

    return <>
        <CreatePortalWrapper id="slide-panel-info">
            <Box >
                <Button
                    sx={{zIndex: 400, backgroundColor: '#fff'}}
                    variant="outlined"
                    onClick={() => setShow(true)}
                >Информация о приходе</Button>
                <IconButton aria-label="delete" onClick={goBack} sx={{zIndex: 400, backgroundColor: '#fff'}}>
                    <CloseIcon/>
                </IconButton>
            </Box>
            {
                show ? <>
                    <Drawer open={true} anchor="bottom" sx={{height: '100vh'}}>
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
                                    <IconButton className="close-button-card" aria-label="delete" onClick={() => setShow(false)}>
                                        <CloseIcon/>
                                    </IconButton>
                                    <TabList
                                        // wrapped
                                        onChange={handleChange}
                                        variant="scrollable"
                                        scrollButtons={true}
                                        visibleScrollbar={false}
                                        // variant="fullWidth"
                                        // centered
                                        aria-label="lab API tabs example"
                                    >
                                        <Tab label="Сохранность документов" value={1} />
                                        <Tab label="Список населенных пунктов" value={2} />
                                    </TabList>
                                </Box>
                                <TabPanel value={1}>
                                    <SendArchivesData objectID={objectID} />
                                    <Table stickyHeader>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">год</TableCell>
                                                <TableCell align="center">тип</TableCell>
                                                <TableCell align="center">шифр</TableCell>
                                                <TableCell align="center">ссылка</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                archives?.map((aRow: any, indexItem: number) => {
                                                    const [year, type, archiveTitle, shifr, link] = aRow;
                                                    return <TableRow key={indexItem}>
                                                        <TableCell align="center">{year}</TableCell>
                                                        <TableCell align="center">{type}</TableCell>
                                                        <TableCell align="center"><Tooltip arrow title={archiveTitle}><u>{shifr}</u></Tooltip></TableCell>
                                                        <TableCell align="center">{
                                                            link ? <Link target="_blank" href={link}>
                                                                <LinkIcon/>
                                                            </Link> : <></>}
                                                        </TableCell>
                                                    </TableRow>
                                                })
                                            }</TableBody>
                                    </Table>
                                </TabPanel>
                                <TabPanel value={2}>
                                    <ol>
                                        {[...currentNotFoundPrikhodNPs, ...currentPrikhodNPs].map((hit: any, index: number) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    <li>{hit.title}</li>
                                                </React.Fragment>
                                            )
                                        })}
                                    </ol>
                                    <div>
                                        {JSON.stringify(error)}
                                    </div>
                                    <div>
                                        {loading}
                                    </div>
                                </TabPanel>
                            </TabContext>
                        </Box>
                    </Drawer>
                </> : <></>
            }

        </CreatePortalWrapper>
        <BoundsToMapItems
            key="BoundsToMapItems"
            bounds={markersBounds}
            callback={() => {}}
        />
        {
            currentPrikhodNPs?.map((np: any) => {
                if (~np.title.toLowerCase().indexOf(title.toLowerCase())) {
                    return <></>
                }
                return <NPPlaceMarker key={np.objectID}
                                      hit={np}
                                      color={+src ? !!~title.toLowerCase().indexOf('церковь') ? 'red' : 'blue' : 'black'} />
            })
        }
    </>
};
export default InfoPage;
