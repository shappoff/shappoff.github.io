import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IndicateButton from "./IndicateButton";
import React from "react";
import {useList} from "react-firebase-hooks/database";
import {getDatabase, ref} from "firebase/database";
import {app} from "./firebase";

const NoFoundPrikhod = ({hit, setIsShowNotFoundPanel}: any) => {
    if (!hit) {return <></>}
    const [snapshots, loading, error] = useList(ref(getDatabase(app), `prikhods/${hit?.objectID}`));
    const [currentDescriptionItem, setCurrentDescriptionItem] = React.useState<any>();

    React.useEffect(() => {
        const formattedSnapshots = snapshots?.reduce((previousValue: any, currentValue: any) => {
            previousValue[currentValue.key] = currentValue.val();
            return previousValue;
        }, {});
        setCurrentDescriptionItem(formattedSnapshots?.nps?.filter((item: any) => !item.coords?.length));
    }, [snapshots]);

    return <Card className="card-np-item">
        <CardContent>
            <CardHeader title={<><span>{hit.pType}</span> <span>{hit.pTitle}</span><span>, </span><span>{hit.title}</span></>} />
            {
                hit._geoloc.lat ? <></> : <IndicateButton item={hit} setIsShowPanel={setIsShowNotFoundPanel}/>
            }
            {
                currentDescriptionItem?.length ? <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <b>Населенные пункты прихода:</b>
                    </AccordionSummary>
                    <AccordionDetails>
                        {
                            currentDescriptionItem?.map((item: any, index: number) => {
                                return item.coords?.length ? <></> : <Card key={index} className="card-np-item">
                                    <CardContent>
                                        <CardHeader title={<span dangerouslySetInnerHTML={{__html: item.title}}></span>} />
                                        <IndicateButton item={item} setIsShowPanel={setIsShowNotFoundPanel}/>
                                    </CardContent>
                                </Card>
                            })
                        }
                    </AccordionDetails>
                </Accordion> : <></>
            }
        </CardContent>
    </Card>
};

export default NoFoundPrikhod;