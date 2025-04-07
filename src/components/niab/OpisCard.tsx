import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from "next/link";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import WrapToTooltip from "@/components/niab/BasicTooltip";

export default function OpisCard({info}: any) {
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
            <CardContent>
                <Typography variant="h6" component="div" sx={{whiteSpace: 'nowrap'}}>Опись {info?.op}</Typography>
                <WrapToTooltip note={info?.n}>
                    <Link target="_blank" href={`https://drive.google.com/file/d/${info?.docId}`}>
                        <PictureAsPdfIcon sx={{ fontSize: 70 }} />
                    </Link>
                </WrapToTooltip>
            </CardContent>
            <CardActions>
                {info?.docId ? <Button size="small"><Link target="_blank" href={`https://drive.google.com/file/d/${info?.docId}`}>Открыть</Link></Button> : <></>}
            </CardActions>
        </Card>
    );
}
