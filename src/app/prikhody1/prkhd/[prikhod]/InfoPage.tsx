'use client'

import Drawer from '@mui/material/Drawer';
import { createPortal } from 'react-dom';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const InfoPage = () => {
    return <>
        {createPortal(<>
            <Drawer open={true} onClose={() => history.back()}  variant="persistent" anchor="bottom">
                <div>
                    <IconButton aria-label="delete" onClick={() => history.back()}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <div>This child is placed in the document body.</div>
                <div>This child is placed in the document body.</div>
                <div>This child is placed in the document body.</div>
                <div>This child is placed in the document body.</div>
            </Drawer>

        </>, document.getElementById('slide-panel-info'))}
    </>
};
export default InfoPage;
