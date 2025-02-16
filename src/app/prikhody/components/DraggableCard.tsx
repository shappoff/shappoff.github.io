import React from "react";
import Tooltip from "react-bootstrap/Tooltip";
import Card from "react-bootstrap/Card";
import CloseButton from "react-bootstrap/CloseButton";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {EditIcon, getIcon, InfoIcon, PersonInfo} from "./icons";
import Draggable from "react-draggable";

function get(obj: any, propPath: string, defaultValue?: any) {
    return getPropertyByPath(obj, propPath, defaultValue);
}

function getPropertyByPath(obj: any, propPath: string, defaultValue?: any) {
    return propPath.split('.').reduce((o, p) => (o && o[p]) || defaultValue, obj);
}


const DraggableCard = ({family, indexFamily, debouncedSearchTerm, setCurrentFamily}: any) => {
    const user = localStorage.getItem('user');
    const [currantTab, setCurrantTab] = React.useState<'fio' | 'origin'>(debouncedSearchTerm ? 'fio' : 'origin');
    const [pgs, setPgs] = React.useState<string>();
    const pages: any = {};
    const onCloseHandler = () => {
        setCurrentFamily((array: Array<any>) => {
            return array.filter((item: any, idx: number) => idx !== indexFamily);
        });
    };

    const item = family.people ? family.people : [family];

    React.useEffect(() => {
        setPgs(Object.keys(pages).filter((i: any) => !!i).join(', '));
    }, pages);

    return <Draggable handle=".card-draggable-body" axis={'both'} defaultPosition={{x: 0, y: 0}} grid={[25, 25]} defaultClassName="draggable-card-item resizable-modal-content">
        <Card border="secondary" style={{ width: 'fit-content'}} className="famyly-item-card">
            <Card.Header className="text-end card-header-item card-draggable-body">
                <ul className="nav nav-tabs card-list-of-types">
                    <li className="nav-item">
                        <a className={`nav-link ${currantTab === 'fio' ? 'active' : ''}`}
                           href="#"
                           onClick={() => setCurrantTab('fio')}
                           onTouchStart={() => setCurrantTab('fio')}
                        >ФИО</a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${currantTab === 'origin' ? 'active' : ''}`}
                           href="#"
                           onClick={() => setCurrantTab('origin')}
                           onTouchStart={() => setCurrantTab('origin')}
                        >Ориг.</a>
                    </li>
                </ul>
                <CloseButton className="close-button-card" onClick={onCloseHandler} onTouchStart={onCloseHandler}></CloseButton>
            </Card.Header>
            <ol className="card-draggable-body">
                {
                    family.type === 'Кладбище' ? <>
                        <NecropolisBody family={family} debouncedSearchTerm={debouncedSearchTerm} currantTab={currantTab} />
                    </> : <>
                        {item.map((person: any, indexP: number) => {
                            Object.assign(pages, {[person.page]: true});
                            const ageIsNaN = isNaN(+person.aCur);
                            const ageIsInteger = Number.isInteger(+person.aCur);
                            const aCurLength = `${person.aCur}`.length;

                            let yearOfBorn: any;
                            if (!ageIsNaN && ageIsInteger && (+person.aCur > 0)) {
                                yearOfBorn = (aCurLength === 4) ? person.aCur : +family.year - +person.aCur;
                            }

                            return <li key={indexP} className="card-list-row">
                                {
                                    currantTab === 'fio' && debouncedSearchTerm ?
                                        <span dangerouslySetInnerHTML={{
                                            __html: get(person, '_highlightResult.fio.value') || family?._highlightResult?.people[indexP]?.fio?.value
                                        }}></span> :
                                        <span>{person[currantTab] || person.fio} </span>
                                }
                                {
                                    person.aPrev || yearOfBorn ?
                                        <OverlayTrigger
                                            trigger={['hover', 'click']}
                                            placement="auto"
                                            overlay={<Tooltip>{`${person.aPrev ? `в ${family.prevYear}: ${person.aPrev}; ` : ''}${yearOfBorn ? `${aCurLength === 4 ? '' : '≈'}${yearOfBorn} г.р` : ''}`}</Tooltip>}
                                        >
                                            <span>  <a href="#">{person.aCur && aCurLength !== 4 ? `${person.aCur} ${plural(+person.aCur)}` : <PersonInfo />}</a></span>
                                        </OverlayTrigger>
                                        :
                                        <span>{person.aCur ? ` (${person.aCur} ${plural(+person.aCur)})` : ''}</span>
                                }
                                {
                                    person.note || family.familyNote ? <OverlayTrigger
                                        trigger={['hover', 'click']}
                                        placement="auto"
                                        overlay={<Tooltip>{person.note || family.familyNote}</Tooltip>}
                                    >
                                <span style={{margin: '0 5px'}}>
                                    <InfoIcon />
                                </span>
                                    </OverlayTrigger> : ''
                                }
                            </li>
                        })}
                    </>
                }

            </ol>
            <Card.Footer className="text-muted text-truncate justify-content-space-between">
                <i>
                    <OverlayTrigger
                        trigger={['hover', 'click']}
                        placement="bottom"
                        overlay={<Tooltip>{family.type}{family.fod && `, ${family.fod}` }{pgs ? `, лл. ${pgs}` : ''}</Tooltip>}
                    >
                        <span>№{family.fCur}{family.year ? `, ${family.year} г.` : ''}{family.place ? `, ${family.place}` : ''}</span>
                    </OverlayTrigger>

                </i>
{/*
                {
                    family.type === 'Кладбище' && (user === 'shappoff' || user === 'ira.ira1165') ? <>
                        <a title="Редактировать запись" target="_blank" href={`https://docs.google.com/spreadsheets/d/1nEPgrLrlCATZ2ZKQKNXv2KyOoCI5qzH_g-vCpEcBwlA?range=A${family.people[0].rowIndex}`}>
                            <EditIcon/>
                        </a>
                    </> : <></>
                }
*/}
            </Card.Footer>

        </Card>
    </Draggable>
};

const plural = (number: number, titles: Array<string> = ['год', 'года', 'лет']) => {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}

const NecropolisBody = ({family, debouncedSearchTerm, currantTab}: any) => {
    return <>
        {
            family.people.map((person: any, indexP: number) => {
                const ageIsNaN = isNaN(+person.aCur);
                const ageIsInteger = Number.isInteger(+person.aCur);
                const aCurLength = `${person.aCur}`.length;

                let yearOfBorn: any;
                if (!ageIsNaN && ageIsInteger && (+person.aCur > 0)) {
                    yearOfBorn = (aCurLength === 4) ? person.aCur : +family.year - +person.aCur;
                }
                let lifeDurationLabel: string;
                if (person.born || person.died) {
                    lifeDurationLabel = `${person.born ? person.born : '?'} - ${person.died ? person.died : '?'}`;
                }

                return <li key={indexP} className="card-list-row">
                    {
                        currantTab === 'fio' && debouncedSearchTerm ?
                            <span dangerouslySetInnerHTML={{
                                __html: get(person, '_highlightResult.fio.value') || family?._highlightResult?.people[indexP]?.fio?.value
                            }}></span> :
                            <span>{person[currantTab] || person.fio} </span>
                    }
                    {
                        lifeDurationLabel ? <>
                            <OverlayTrigger
                                trigger={['hover', 'click']}
                                placement="auto"
                                overlay={<Tooltip>{lifeDurationLabel}</Tooltip>}
                            >
                                <span>  <a href="#">{person.aCur && aCurLength !== 4 ? `${person.aCur} ${plural(+person.aCur)}` : <PersonInfo />}</a></span>
                            </OverlayTrigger>
                        </> : <>
                            {
                                person.aPrev || yearOfBorn ?
                                    <OverlayTrigger
                                        trigger={['hover', 'click']}
                                        placement="auto"
                                        overlay={<Tooltip>{`${person.aPrev ? `в ${family.prevYear}: ${person.aPrev}; ` : ''}${yearOfBorn ? `${aCurLength === 4 ? '' : '≈'}${yearOfBorn} г.р` : ''}`}</Tooltip>}
                                    >
                                        <span>  <a href="#">{person.aCur && aCurLength !== 4 ? `${person.aCur} ${plural(+person.aCur)}` : <PersonInfo />}</a></span>
                                    </OverlayTrigger>
                                    :
                                    <span>{person.aCur ? ` (${person.aCur} ${plural(+person.aCur)})` : ''}</span>
                            }
                        </>
                    }
                    {
                        person.note || family.familyNote ? <OverlayTrigger
                            trigger={['hover', 'click']}
                            placement="auto"
                            overlay={<Tooltip>{person.note || family.familyNote}</Tooltip>}
                        >
                                <span style={{margin: '0 5px'}}>
                                    <InfoIcon />
                                </span>
                        </OverlayTrigger> : ''
                    }
                </li>
            })
        }
    </>
};

export default DraggableCard;
