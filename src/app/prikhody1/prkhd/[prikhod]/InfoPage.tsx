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
                        <IconButton className="close-button-card" aria-label="delete" onClick={() => setShow(false)}>
                            <CloseIcon/>
                        </IconButton>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">год</TableCell>
                                    <TableCell align="center">тип</TableCell>
                                    <TableCell align="center">архив</TableCell>
                                    <TableCell align="center">шифр</TableCell>
                                    <TableCell align="center">ссылка</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    archives?.map((aRow: any, indexItem: number) => <TableRow key={indexItem}>
                                        {
                                            aRow.map((iCell: any, indexCell: number) => {
                                                if (iCell && ~iCell.indexOf('http')) {
                                                    return <TableCell key={indexCell} align="center">
                                                        <Link target="_blank" href={iCell}>
                                                            <LinkIcon />
                                                        </Link>
                                                    </TableCell>
                                                }
                                                return <TableCell key={indexCell} align="center">{iCell}</TableCell>
                                            })
                                        }
                                    </TableRow>)
                                }</TableBody>
                        </Table>
                    </Drawer>
                </> : <></>
            }

        </CreatePortalWrapper>
    </>
};
export default InfoPage;
