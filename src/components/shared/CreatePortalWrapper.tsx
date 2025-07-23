'use client'

import {createPortal} from 'react-dom';

const CreatePortalWrapper = ({children, id = 'slide-panel-info'}: any) => {
    return <>
        {
            createPortal(
                <>{children}</>,
                document?.getElementById(id) as any
            )
        }
    </>
};

export default CreatePortalWrapper;
