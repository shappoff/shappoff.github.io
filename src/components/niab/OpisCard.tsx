import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from "next/link";

export default function OpisCard({info}: any) {
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
                <Typography variant="h6" component="div">{info?.op}</Typography>
                {info?.note ? <Typography sx={{color: 'text.secondary', mb: 1.5}}>{info?.note}</Typography> : <></>}
            </CardContent>
            <CardActions>
                {info?.oplink ? <Button size="small"><Link target="_blank" href={info?.oplink}>Открыть</Link></Button> : <></>}
            </CardActions>
        </Card>
    );
}
