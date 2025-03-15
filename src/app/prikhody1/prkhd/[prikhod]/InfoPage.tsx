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

const InfoPage = ({archives}: any) => {
    const router = useRouter();
    const [show, setShow] = React.useState<boolean>(true);
    const [value, setValue] = React.useState<number>(1);

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
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList
                                        // wrapped
                                        onChange={handleChange}
                                        // variant="fullWidth"
                                        // centered
                                        aria-label="lab API tabs example"
                                    >
                                        <IconButton className="close-button-card" aria-label="delete" onClick={() => setShow(false)}>
                                            <CloseIcon/>
                                        </IconButton>
                                        <Tab label="Список населенных пунктов" value={1} />
                                        <Tab label="Сохранность документов" value={2} />
                                    </TabList>
                                </Box>
                                <TabPanel value={1}>Item One</TabPanel>
                                <TabPanel value={2}>
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
                                                        <TableCell align="center">{shifr}</TableCell>
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
                            </TabContext>
                        </Box>
                    </Drawer>
                </> : <></>
            }

        </CreatePortalWrapper>
    </>
};
export default InfoPage;
