import Card from "react-bootstrap/Card";
import IndicateButton from "./IndicateButton";
import Accordion from "react-bootstrap/Accordion";
import React from "react";
import {useList} from "react-firebase-hooks/database";
import {getDatabase, ref} from "firebase/database";
import {app} from "./firebase";

const NoFoundPrikhod = ({hit, setIsShowNotFoundPanel}: any, ) => {
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
                                currentDescriptionItem?.map((item: any, index: number) => {
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