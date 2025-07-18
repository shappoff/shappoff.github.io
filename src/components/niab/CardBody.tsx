import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CardBody = ({state}: any) => {
    const {title, anotation} = state;
    const isTitle = !!~title.indexOf('<b>');
    const isAnotation = !!~anotation.indexOf('<b>');

    return <>
        <Accordion defaultExpanded={isTitle}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <header>
                    <i>Название фонда</i></header>
            </AccordionSummary>
            <AccordionDetails>
                <p dangerouslySetInnerHTML={{__html: state.title}}/>
            </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded={isAnotation}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <header>
                    <i>Аннотация документов</i></header>
            </AccordionSummary>
            <AccordionDetails>
                <p dangerouslySetInnerHTML={{__html: state.anotation}}/>
            </AccordionDetails>
        </Accordion>
    </>
};

export default CardBody;
