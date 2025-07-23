import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from "next/link";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import WrapToTooltip from "@/components/featured/niab/BasicTooltip";

export default function OpisCard({info}: any) {
    const opisUrl = `https://drive.google.com/file/d/${info?.docId}`;
    return (
        <Card sx={{
            margin: '1rem',
            height: 'auto',
            width: '10rem',
            minWidth: '10rem',
            '&[data-active]': {
                backgroundColor: 'action.selected',
                '&:hover': {
                    backgroundColor: 'action.selectedHover',
                },
            },
        }}>
            <Link target="_blank" href={opisUrl}>
                <CardContent>
                    <Typography variant="h6" component="div" sx={{whiteSpace: 'nowrap'}}>Опись {info?.op}</Typography>
                    <WrapToTooltip note={info?.n}>

                            <PictureAsPdfIcon sx={{ fontSize: 70 }} />

                    </WrapToTooltip>
                </CardContent>
                <CardActions>
                    {info?.docId ? <Button size="small">Открыть</Button> : <></>}
                </CardActions>
            </Link>
        </Card>
    );
}
