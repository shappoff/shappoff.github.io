import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from "next/link";

export default function OpisCard({info}: any) {
    const {op, count, lang, oplink, internal, note, years, opNmb, store, storeNote} = info;
    return (
        <Card sx={{
            margin: '1rem',
            height: 'auto',
            width: '10rem',
            '&[data-active]': {
                backgroundColor: 'action.selected',
                '&:hover': {
                    backgroundColor: 'action.selectedHover',
                },
            },
        }}>
            <CardContent>
                <Typography variant="h6" component="div">{op}</Typography>
                {note ? <Typography sx={{color: 'text.secondary', mb: 1.5}}>{note}</Typography> : <></>}
            </CardContent>
            <CardActions>
                <Button size="small"><Link target="_blank" href={oplink}>Открыть</Link></Button>
            </CardActions>
        </Card>
    );
}
