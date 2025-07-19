import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CardBody = ({state: stateProps}: any) => {
    const [state, setState] = React.useState();

    React.useEffect(() => {
        const {title, anotation} = stateProps;
        const isTitle = !!~title.indexOf('<b>');
        const isAnotation = !!~anotation.indexOf('<b>');

        setState({isTitle, isAnotation});
    }, [stateProps]);

    if (!state) {
        return <></>
    }

    return <>
        <Accordion expanded={state.isTitle}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <header>
                    <i>Название фонда</i></header>
            </AccordionSummary>
            <AccordionDetails>
                <p dangerouslySetInnerHTML={{__html: stateProps.title}}/>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={state.isAnotation}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <header>
                    <i>Аннотация документов</i></header>
            </AccordionSummary>
            <AccordionDetails>
                <p dangerouslySetInnerHTML={{__html: stateProps.anotation}}/>
            </AccordionDetails>
        </Accordion>
    </>
};

export default CardBody;
