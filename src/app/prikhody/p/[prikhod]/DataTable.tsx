import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import CopyToClipboardData from "@/app/prikhody/p/[prikhod]/CopyToClipboardData";
import Tooltip from '@mui/material/Tooltip';
import Link from "next/link";
import {getNestedArrayValue} from "@/components/utils";
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined';
import LinkIcon from '@mui/icons-material/Link';

const paginationModel = { page: 0, pageSize: 10 };

export default function DataTable({data, digited}: any) {
    const columns: GridColDef[] = [
        { field: 'copy', headerName: 'скопировать', width: 120,
            sortable: false,
            renderCell: (params) => {
                const {year, type, short, fod, link, full, fond, opis, delo, id} = params.row;
                return <CopyToClipboardData data={`${short} ${fod}, ${type}, ${year}`} />;
            }
        },
        { field: 'short', headerName: 'архив', width: 130,
            renderCell: (params) => {
                const {year, type, short, fod, link, full, fond, opis, delo, id} = params.row;
                return <Tooltip arrow title={full}><u>{short}</u></Tooltip>;
            }

        },
        { field: 'year', headerName: 'год', width: 130 },
        {
            field: 'type',
            headerName: 'тип',
            description: 'РБУ - Рождения, Браки, Умершие; ИВ - Исповедные Ведомости; БО - Брачные Обыски',
            sortable: false,
            type: 'string',
            width: 200,
        },
        {
            field: 'fod',
            headerName: 'Ф-О-Д',
            description: 'Фонд-Опись-Дело',
            width: 160,
            renderCell: (params) => {
                const {year, type, short, fod, link, full, fond, opis, delo, id} = params.row;
                return <React.Fragment>
                    {
                        short === 'НИАБ' ? <Link target="_blank" href={`/niab/${fond}`}><u>{fond}</u></Link> : fond
                    }
                    {opis ? `-${opis}` : ''}{delo ? `-${delo}` : ''}
                </React.Fragment>;
            }
        },
        {
            field: 'note',
            headerName: 'информация',
            sortable: false,
            width: 160,
            renderCell: (params) => {
                const {year, type, short, fod, link, full, fond, opis, delo, id} = params.row;
                return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: '100%'}}>
                    {
                        link ? <>
                            <Tooltip arrow title="Ссылка на снимки">
                                <Link target="_blank" href={link}>
                                    <LinkIcon/>
                                </Link>
                            </Tooltip>
                        </> : <></>}
                    {
                        getNestedArrayValue(digited, fond, opis, delo) ? <>
                            <Tooltip arrow title="Оцифрованно в НИАБ">
                                <DocumentScannerOutlinedIcon sx={{ fontSize: 15, cursor: 'pointer' }} />
                            </Tooltip>
                        </> : ''
                    }
                </div>;
            }
        },
    ];

    return (
        <Paper sx={{width: '100%' }}>
            <DataGrid
                rows={data}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10, 50, 100]}
                sx={{ border: 0 }}
            />
        </Paper>
    );
}
