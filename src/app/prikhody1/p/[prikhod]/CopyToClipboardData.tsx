import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from '@mui/icons-material/Done';
import {copyToClipboard} from "@/components/utils";
import Tooltip from '@mui/material/Tooltip';

const CopyToClipboardData = ({data}: any) => {
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
                                copyToClipboard(data, () => setIsCopied(true));
                            }}
                            sx={{
                                fontSize: '15px',
                                cursor: 'pointer'
                            }}
                        />
                    </Tooltip>
                </>
        }

    </React.Fragment>
};

export default CopyToClipboardData;
