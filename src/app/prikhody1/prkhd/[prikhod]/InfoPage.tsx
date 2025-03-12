'use client'

import Drawer from '@mui/material/Drawer';
import {createPortal} from 'react-dom';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {useRouter} from 'next/navigation'
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import React from "react";

const InfoPage = ({archives}: any) => {
    const router = useRouter();

    const goBack = () => {
        if (history.length > 2) {
            router.back();
        } else {
            router.push('/prikhody1')
        }
    };

    return <>
        {
            createPortal(<>
                    <Drawer open={true} variant="persistent" anchor="bottom">
                        <div>
                            <IconButton aria-label="delete" onClick={goBack}>
                                <CloseIcon/>
                            </IconButton>
                        </div>
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
                                    archives.map((aRow: any) => <TableRow>
                                        {
                                            aRow.map((iCell: any) => <TableCell align="center">{iCell}</TableCell>)
                                        }
                                    </TableRow>)
                                }</TableBody>
                        </Table>
                    </Drawer>
                </>,
                document?.getElementById('slide-panel-info') as any
            )
        }
    </>
};
export default InfoPage;
