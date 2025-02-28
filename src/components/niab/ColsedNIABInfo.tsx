'use client'

import * as React from 'react';
import Snackbar, {SnackbarCloseReason} from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Link from "next/link";
import Alert from '@mui/material/Alert';

export default function ColsedNIABInfo() {
    const [open, setOpen] = React.useState<boolean>(true);

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div>
            <Snackbar
                open={open}
                onClose={handleClose}
            >
                <Alert severity="warning">
                    Внимание! НИАБ Закрывется на ремнот&nbsp;-&nbsp;
                    <Link target="_blank" href="https://niab.by/newsite/ru/Priostanovka_hkranilische4"
                          onClick={handleClose}
                    >
                        <u>подробнее</u>
                    </Link>
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleClose}
                    >
                        <CloseIcon fontSize="small"/>
                    </IconButton>
                </Alert>
            </Snackbar>
        </div>
    );
}
