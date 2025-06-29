import './frame.css';
import {Metadata} from "next";
import {getGoogleSheetsData} from "@/components/gsheets";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const metadata: Metadata = {
    title: "Копии документов",
    description: "Копии документов з архивов, что есть у меня на руках из НИАБ",
    keywords: ['НИАБ', 'цифровые копии', ' Национальный исторический архив Беларуси', 'генеалогия'],
};

export default async function Home() {
    const data = await getGoogleSheetsData('НИАБ!A1:E69', '1kME-rXLIM9DmOb_e0Z5wJiPKAH5u-5FIfKfgxTYzfjU') || [];
    const [header]: any = data;
    return <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: '96vh' }}>
            <Table sx={{ minWidth: 650 }} size="small" stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">{header[0]}</TableCell>
                        <TableCell align="center">{header[1]}</TableCell>
                        <TableCell align="center">{header[2]}</TableCell>
                        <TableCell align="center">{header[3]}</TableCell>
                        <TableCell align="center">{header[4]}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row: any, index:  number) => index ? (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">{row[0]}</TableCell>
                            <TableCell align="center">{row[1]}</TableCell>
                            <TableCell align="center">{row[2]}</TableCell>
                            <TableCell align="left">{row[3]}</TableCell>
                            <TableCell align="left">{row[4]}</TableCell>
                        </TableRow>
                    ) : '')}
                </TableBody>
            </Table>
        </TableContainer>
    </Paper>;
}
