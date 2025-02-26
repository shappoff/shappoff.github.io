import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from "next/link";
import {Chip, Tooltip} from "@mui/material";

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
                {
                    info.s ? <>
                        <Link href="https://forum.vgd.ru/post/468/118798/p3690535.htm#pp3690535" target="_blank">
                            <Tooltip title="Индексация описей фондов НИАБ (Минск). Волонтерская инициатива. Присоединяйтесь к нашему проекту! Принять участие смогут все желающие">
                                <Chip label={info.s + '%'} size="small" sx={{textDecoration: 'underline'}} />
                            </Tooltip>
                        </Link>
                    </> : <></>
                }
                {info?.n ? <Typography sx={{color: 'text.secondary', mb: 1.5}}>{info?.n}</Typography> : <></>}
            </CardContent>
            <CardActions>
                {info?.docId ? <Button size="small"><Link target="_blank" href={`https://drive.google.com/file/d/${info?.docId}`}>Открыть</Link></Button> : <></>}
            </CardActions>
        </Card>
    );
}
