'use client'

import React from 'react';
import {css, styled} from "@mui/system";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Input from '@mui/joy/Input';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/joy/Typography';
import Tooltip from '@mui/material/Tooltip';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const Names = ({data}: any) => {
    const [value, setValue] = React.useState<string>('');
    const [currentSex, setCurrentSex] = React.useState<'m' | 'f'>('m');
    const [hits, setHits] = React.useState<Array<any>>([]);

    const handleChange = (event: React.SyntheticEvent, value: 'm' | 'f') => {
        setCurrentSex(value);
    };

    React.useEffect(() => {
        if (value.length) {
            setHits(data.filter(({key, sex}: any) => {
                const regexp = new RegExp(value, "g");
                return key && key.match(regexp) && currentSex === sex;
            }));
        } else {
            setHits([]);
        }
    }, [value, currentSex]);

    const searchHandler = ({target}: any) => setValue(target.value);

    return <NamesWrapper>
        <Tabs
            value={currentSex}
            onChange={handleChange}
            aria-label="basic tabs example"
        >
            <Tab label="Мужские" value="m" />
            <Tab label="Женские" value="f" />
        </Tabs>
        <Input autoFocus
               onChange={searchHandler}
               placeholder="Имя"
               value={value}
        />

        {
            hits.length ? <Table sx={{ minWidth: 650 }} aria-label="result table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Въ передачѣ на русскій языкъ</TableCell>
                            <TableCell>Въ польскомъ произношеніи.</TableCell>
                            <TableCell>Святцы</TableCell>
                            <TableCell>Смысл имени</TableCell>
                            <TableCell>Происхождение</TableCell>
                            <TableCell>источник</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            hits.map(({pl, ru, sex, date, sence, origin}, index) =>
                                <TableRow key={index}>
                                    <TableCell>{ru}</TableCell>
                                    { pl ? <TableCell>{pl}</TableCell> : <TableCell />}
                                    { date ? <TableCell>{date}</TableCell> : <TableCell />}
                                    { sence ? <TableCell>{sence}</TableCell> : <TableCell />}
                                    { origin ? <TableCell>{origin}</TableCell> : <TableCell />}
                                    <TableCell>
                                        <Tooltip title={
                                            pl ? ' 1901 г. Cписокъ всѣхъ имѣющихся въ обиходѣ у Римско-Католиковъ имѣющихся крестныхъ именъ.' : '1915 г. Алфавитъ именъ веѣхъ святыхъ, празднуемыхъ Православною Восточною Церковью'
                                        }><MenuBookIcon /></Tooltip>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
                : <div className="p-description">
                    <Typography level="body-sm">
                        Если буква(буквы) в имени неразборчива, то просто вводите точку(точки) вместо ее<br/>
                        <code>Никол.й</code><br/>
                        <code>Вла.им.р</code><br/><br/>

                        Если точно известна первая буква - так и вводите ее большой<br/><br/>

                        Если известно, что имя заканчивается на <b>иний</b>, то на конце нужно поставить знак доллара <code>$</code><br/>
                        <code>иний$</code><br/><br/>

                        Если неизвестна первая буква, то начинайте c сивола <code>^</code> и точки<br/>
                        <code>^.имитрий</code><br/>
                    </Typography>

                </div>
        }
    </NamesWrapper>
};

const getIcon = (type: string) => {
    return type === 'ort' ?
        <svg height="15px" width="15px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 512 512">
            <polygon points="424.459,186.249 424.459,122.217 288.016,122.217 288.016,82.157 350.504,82.157
                350.504,40.059 288.016,40.059 288.016,0 223.984,0 223.984,40.059 161.496,40.059 161.496,82.157 223.984,82.157 223.984,122.217
                87.541,122.217 87.541,186.249 223.984,186.249 223.984,389.783 161.496,389.783 161.496,431.881 223.984,431.881 223.984,512
                288.016,512 288.016,431.881 350.504,431.881 350.504,389.783 288.016,389.783 288.016,186.249 "/>
        </svg>
        :
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
             width="15px" height="15px" viewBox="0 0 946.000000 1280.000000">
            <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
               fill="#000000" stroke="none">
                <path d="M3600 11332 c0 -888 -7 -1353 -20 -1332 -4 7 -10 -2 -14 -21 -8 -41
-56 -119 -98 -160 -37 -35 -115 -75 -166 -85 -24 -5 -30 -9 -20 -15 7 -5 -397
-9 -913 -9 -509 0 -1122 -3 -1362 -7 l-437 -6 0 -1122 0 -1122 218 -6 c119 -4
737 -8 1372 -9 635 -1 1130 -4 1100 -7 l-55 -6 55 -7 c78 -9 165 -52 220 -108
47 -48 90 -123 90 -157 0 -13 2 -15 9 -5 17 28 21 -566 21 -3511 l0 -3057
1118 2 1117 3 5 3265 c3 1796 7 3227 9 3180 l4 -85 7 65 c19 152 49 227 120
300 55 56 142 99 220 108 l55 7 -55 6 c-30 3 467 6 1105 7 638 1 1251 5 1363
9 l202 6 0 1122 0 1122 -422 6 c-232 4 -840 7 -1352 7 -519 0 -925 4 -918 9
10 6 4 10 -20 15 -98 19 -193 93 -241 188 -27 54 -56 169 -59 236 -1 20 -4 3
-8 -38 -4 -41 -7 414 -8 1013 l-2 1087 -1120 0 -1120 0 0 -888z"/>
            </g>
        </svg>

};

const NamesWrapper = styled('div')(
    ({theme}) => css`
      & > div {
        margin: 10px;
      }
      
      & p {
        margin: 15px 0;
      }
    `,
);


export default Names;
