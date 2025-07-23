import React, {ReactElement} from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const BEFO_AFTER_STRING = 80;

function calculateTitle(title: string, isOpen: boolean, defaultTitle: string): ReactElement<unknown, string> {
    const dots = ' ... ';
    const startIndex = title.indexOf('<b>');
    let isBTagExist = !!~startIndex;

    let resultTitle;
    if (isOpen || (!isOpen && !isBTagExist)) {
        resultTitle = <i>{defaultTitle}</i>;
    } else {
        const begin = startIndex - BEFO_AFTER_STRING;
        const end = startIndex + BEFO_AFTER_STRING;
        resultTitle = <p dangerouslySetInnerHTML={{__html:
                `${begin > 0 ? dots : ''}${title.slice(begin < 0 ? 0 : begin, end)}${dots}`
        }} />
    }

    return resultTitle;
}

const CardBody = ({item}: any) => {
    const [isOpenTitle, setIsOpenTitle] = React.useState<boolean>(false);
    const [isOpenAnotation, setIsOpenAnotation] = React.useState<boolean>(false);

    const {_highlightResult} = item;
    const title = _highlightResult.title.value;
    const anotation = _highlightResult.anotation?.value;

    return <>
        <Accordion expanded={isOpenTitle} onChange={() => setIsOpenTitle((prevState) => !prevState)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <header>{calculateTitle(title, isOpenTitle, 'Название фонда')}</header>
            </AccordionSummary>
            <AccordionDetails>
                <p dangerouslySetInnerHTML={{__html: title}}/>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={isOpenAnotation} onChange={() => setIsOpenAnotation((prevState) => !prevState)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <header>{calculateTitle(anotation, isOpenAnotation, 'Аннотация документов')}</header>
            </AccordionSummary>
            <AccordionDetails>
                <p dangerouslySetInnerHTML={{__html: anotation}}/>
            </AccordionDetails>
        </Accordion>
    </>
};

export default CardBody;
