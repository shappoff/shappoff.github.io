'use client'

import * as React from 'react';
import Snackbar, {SnackbarCloseReason} from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';

export default function AlertInfo({children, severity, anchorOrigin, style = {}}: any) {
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

    return <Snackbar
        anchorOrigin={anchorOrigin}
        open={open}
        autoHideDuration={3000}
        style={style}
        onClose={handleClose}
    >
        <Alert severity={severity}>
            {children}
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small"/>
            </IconButton>
        </Alert>
    </Snackbar>;
}
