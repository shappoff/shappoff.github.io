'use client'

import Drawer from '@mui/material/Drawer';
import {createPortal} from 'react-dom';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation'

const InfoPage = () => {
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
                        <div>This child is placed in the document body.</div>
                        <div>This child is placed in the document body.</div>
                        <div>This child is placed in the document body.</div>
                        <div>This child is placed in the document body.</div>
                    </Drawer>
                </>,
                document?.getElementById('slide-panel-info') as any
            )
        }
    </>
};
export default InfoPage;
