'use client'

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import {styled} from '@mui/material/styles';

const DemoPaper = styled(Paper)(({theme}) => ({
    width: 300,
    height: 120,
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
}));
export default function BasicStack() {
    return (
        <Stack useFlexGap direction="row" spacing={2} sx={{justifyContent: 'space-around', margin: '2rem 0'}}>
            <DemoPaper>
                <b>Минск</b>
                <div>806 953 дел из 1 023 512</div>
                <div>80 %</div>
            </DemoPaper>
            <DemoPaper>
                <b>Гродно</b>
                <div>196 073 дел из 419 149</div>
                <div>47 %</div>
            </DemoPaper>
        </Stack>
    );
}
