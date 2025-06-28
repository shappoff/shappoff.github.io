import React from "react";
import {Card} from "react-bootstrap";
import { NoFoundPrikhodProps, PrikhodNP } from '../../shared/types';
import IndicateButton from "./IndicateButton";
import Accordion from "react-bootstrap/Accordion";
import {useList} from "react-firebase-hooks/database";
import {getDatabase, ref} from "firebase/database";
import {app} from "./firebase";

const NoFoundPrikhod = ({hit, setIsShowNotFoundPanel}: NoFoundPrikhodProps) => {
    if (!hit) {return <></>}
    const [snapshots, loading, error] = useList(ref(getDatabase(app), `prikhods/${hit?.objectID}`));
    const [currentDescriptionItem, setCurrentDescriptionItem] = React.useState<PrikhodNP[]>([]);

    React.useEffect(() => {
        const formattedSnapshots = snapshots?.reduce((previousValue: Record<string, any>, currentValue: any) => {
            previousValue[currentValue.key] = currentValue.val();
            return previousValue;
        }, {});
        setCurrentDescriptionItem(formattedSnapshots?.nps?.filter((item: PrikhodNP) => !item.coords?.length) || []);
    }, [snapshots]);

    return <Card key={hit.objectID} className="card-np-item">
        <Card.Body>
            <Card.Title><span>{hit.pType}</span> <span>{hit.pTitle}</span><span>, </span><span>{hit.title}</span></Card.Title>
            {
                hit._geoloc.lat ? <></> : <IndicateButton item={hit} setIsShowPanel={setIsShowNotFoundPanel}/>
            }
            {
                currentDescriptionItem?.length ? <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Населенные пункты прихода:</Accordion.Header>
                        <Accordion.Body>
                            {
                                currentDescriptionItem?.map((item: PrikhodNP, index: number) => {
                                    return item.coords?.length ? <></> : <Card key={index} className="card-np-item">
                                        <Card.Body>
                                            <Card.Title><span
                                                dangerouslySetInnerHTML={{__html: item.title}}></span></Card.Title>
                                            <IndicateButton item={item} setIsShowPanel={setIsShowNotFoundPanel}/>
                                        </Card.Body>
                                    </Card>
                                })
                            }
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion> : <></>
            }
        </Card.Body>
    </Card>
};

export default NoFoundPrikhod;
