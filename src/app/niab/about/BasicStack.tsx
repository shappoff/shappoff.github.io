'use client'

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import {styled} from '@mui/material/styles';
import './BasicStack.css';

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
    const niabMinsk = {
        count: 806953,
        percent: 80
    };
    const niabGrodno = {
        count: 196073,
        percent: 47
    };
    return (
        <Stack useFlexGap direction="row" spacing={2}
               style={{
                   "--niab-minsk-count": niabMinsk.count,
                   "--niab-minsk-percent": niabMinsk.percent,
                   "--niab-grodno-count": niabGrodno.count,
                   "--niab-grodno-percent": niabGrodno.percent,
               } as React.CSSProperties}
               sx={{justifyContent: 'space-around', margin: '2rem 0'}}>
            <DemoPaper >
                <b>Минск</b>
                <div><span id="niab-minsk-count" /> дел из <span>1 023 512</span></div>
                <div><span id="niab-minsk-percent" /> %</div>
            </DemoPaper>
            <DemoPaper>
                <b>Гродно</b>
                <div><span id="niab-grodno-count" /> дел из <span>419 149</span></div>
                <div><span id="niab-grodno-percent" /> %</div>
            </DemoPaper>
        </Stack>
    );
}
