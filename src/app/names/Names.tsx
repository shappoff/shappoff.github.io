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

type SexTypes = 'm' | 'f';
// Name data structure interface
export interface NameData {
  key: string;
  sex: SexTypes;
  pl?: string;
  ru?: string;
  date?: string;
  sence?: string;
  origin?: string;
}

// Props interface for the Names component
interface NamesProps {
  data: NameData[];
}

// Event handler types
type TabChangeHandler = (event: React.SyntheticEvent, value: SexTypes) => void;
type SearchHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;

// Icon type for religious symbols
type IconType = 'ort' | 'catholic';

// Table row data interface
interface TableRowData {
  pl?: string;
  ru?: string;
  sex: SexTypes;
  date?: string;
  sence?: string;
  origin?: string;
}

const Names: React.FC<NamesProps> = ({data}): React.JSX.Element => {
    const [value, setValue] = React.useState<string>('');
    const [currentSex, setCurrentSex] = React.useState<SexTypes>('m');
    const [hits, setHits] = React.useState<NameData[]>([]);

    const handleChange: TabChangeHandler = (event, value) => {
        setCurrentSex(value);
    };

    React.useEffect(() => {
        if (value.length) {
            setHits(data.filter(({key, sex}: NameData) => {
                const regexp = new RegExp(value, "g");
                return key && key.match(regexp) && currentSex === sex;
            }));
        } else {
            setHits([]);
        }
    }, [value, currentSex]);

    const searchHandler: SearchHandler = ({target}) => setValue(target.value);

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
                            hits.map(({pl, ru, sex, date, sence, origin}: TableRowData, index: number) =>
                                <TableRow key={index}>
                                    <TableCell>{ru}</TableCell>
                                    { pl ? <TableCell>{pl}</TableCell> : <TableCell />}
                                    { date ? <TableCell>{date}</TableCell> : <TableCell />}
                                    { sence ? <TableCell>{sence}</TableCell> : <TableCell />}
                                    { origin ? <TableCell>{origin}</TableCell> : <TableCell />}
                                    <TableCell>
                                        <Tooltip title={
                                            pl ? '1901 г. Cписокъ всѣхъ имѣющихся въ обиходѣ у Римско-Католиковъ имѣющихся крестныхъ именъ.' : '1915 г. Алфавитъ именъ веѣхъ святыхъ, празднуемыхъ Православною Восточною Церковью'
                                        }><MenuBookIcon /></Tooltip>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
                : <div className="p-description">
                    <Typography level="body-sm">
                        Если буква(буквы) в имени неразборчиво, то просто вводите точку(точки) вместо ее<br/>
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

const NamesWrapper = styled('div')(
    () => css`
      & > div {
        margin: 10px;
      }
      
      & p {
        margin: 15px 0;
      }
    `,
);


export default Names;
