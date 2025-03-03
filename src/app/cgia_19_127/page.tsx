import {Metadata} from "next";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {cgia_19_127Path} from "@/components/utils";
import fs from "fs";

export const metadata: Metadata = {
    title: "Лепельский уезд, Витебская губерия, ЦГИА СПб. ф.19 оп.127",
    description: "Упоминания уроженцев Лепельского уезда Витебской губернии в ЦГИА СПб. ф.19 оп.127, Центральный государственный исторический архив Санкт-Петербурга",
    keywords: ['ЦГИА', 'СПб.', 'Лепельский', 'Витебская', 'генеалогия'],
};

export default async function Home() {
    const data = JSON.parse(fs.readFileSync(cgia_19_127Path, 'utf8'));
    const [header]: any = data;
    return <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: '96vh' }}>
            <Table sx={{ minWidth: 650 }} size="small" stickyHeader aria-label="sticky table">
{/*
                <TableHead>
                    <TableRow>
                        <TableCell align="center">1</TableCell>
                        <TableCell align="center">1</TableCell>
                        <TableCell align="center">1</TableCell>
                        <TableCell align="center">1</TableCell>
                        <TableCell align="center">1</TableCell>
                        <TableCell align="center">1</TableCell>
                        <TableCell align="center">1</TableCell>
                    </TableRow>
                </TableHead>
*/}
                <TableBody>
                    {data.map((row: any, index:  number) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">{row[2]} | {row[0]}</TableCell>
                            <TableCell align="center">{row[1]}</TableCell>
                            {/*<TableCell align="center">{row[2]}</TableCell>*/}
                            <TableCell align="center">{row[3]}</TableCell>
                            <TableCell align="center">{row[4]}</TableCell>
                            <TableCell align="center">{row[5]}</TableCell>
                            <TableCell align="center">{row[6]}</TableCell>
                            <TableCell align="center">{row[7]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Paper>;
}
