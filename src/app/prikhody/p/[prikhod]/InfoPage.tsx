'use client'

import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {useRouter} from 'next/navigation'
import {Button} from "@mui/material";
import React from "react";
import CreatePortalWrapper from "@/components/CreatePortalWrapper";
import Box from '@mui/material/Box';
import './InfoPage.css';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import useFirebaseAuth from "@/components/prikhody/useFirebaseAuth";
import {getDatabase, ref} from "firebase/database";
import {useList} from "react-firebase-hooks/database";
import NPPlaceMarker from "@/components/prikhody/NPPlaceMarker";
import SendArchivesData from "@/app/prikhody/p/[prikhod]/SendArchivesData";
import useMarkersBounds from "@/components/prikhody/useMarkersBounds";
import BoundsToMapItems from "@/components/prikhody/BoundsToMapItems";
import DataTable from "@/app/prikhody/p/[prikhod]/DataTable";

const InfoPage = ({archives, prikhod, digited, rejected}: any) => {
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
            router.push('/prikhody')
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
                                    <DataTable digited={digited} rejected={rejected} data={archives.map((aRow: Array<any>, index: number) => {
                                        const [year, type, short, fod, link, full] = aRow;
                                        const [fond, opis, delo] = fod.split('-');
                                        return ({year, type, short, fod, link, full, fond, opis, delo, id: index});
                                    })} />
                                </TabPanel>
                                <TabPanel value={2}>
                                    <ol>
                                        {[...currentNotFoundPrikhodNPs, ...currentPrikhodNPs].map((hit: any, index: number) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    <li dangerouslySetInnerHTML={{__html: hit.title}} />
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
                if (~np.title.toLowerCase().indexOf(pTitle.toLowerCase())) {
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
