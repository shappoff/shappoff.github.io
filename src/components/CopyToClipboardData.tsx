import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from '@mui/icons-material/Done';
import {copyToClipboard} from "@/components/utils";
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';

const CopyToClipboardData = ({data, callback, withSnackbar = false}: any) => {
    const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);
    const [isCopied, setIsCopied] = React.useState<boolean>(false);

    return <React.Fragment>
        {
            isCopied ?
                <>
                    <DoneIcon sx={{fontSize: '15px'}}/>
                </> :
                <>
                    <Tooltip title="Скопировать шифр дела">
                        <ContentCopyIcon
                            onClick={() => {
                                copyToClipboard(data, () => {
                                    setIsCopied(true);
                                    withSnackbar && setOpenSnackbar(true);
                                    callback && callback()
                                });
                            }}
                            sx={{
                                fontSize: '15px',
                                cursor: 'pointer'
                            }}
                        />
                    </Tooltip>
                </>
        }
        {
            withSnackbar ? <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}
                onClose={() => {setOpenSnackbar(false)}}
                message="Скопировано"
            /> : <></>
        }

    </React.Fragment>
};

export default CopyToClipboardData;
