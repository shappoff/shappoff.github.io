import Tooltip from '@mui/material/Tooltip';

export default function WrapToTooltip({children, note}: any) {
    return <>
        {
            note ? <Tooltip arrow title={note}>
                    {children}
                </Tooltip>
                : children
        }

    </>;
}
