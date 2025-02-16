'use client'

import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import L from "leaflet";
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
import CloseButton from 'react-bootstrap/CloseButton';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import '../prikhody.css';


import {
    MapContainer
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useDebounce from "./useDebounce";
import {useWindowSize} from "./useWindowSize";
import SetMapSizeOnChange from "./SetMapSizeOnChange";
import PrikhodPlaceMarker from "./PrikhodPlaceMarker";
import {Button, Modal, Spinner} from "react-bootstrap";
import FilterBar from "./FilterBar";
import LayersControlComponent from "./LayersControlComponent";

// dev env  - siarhei.sh.1@gmail.com
// prod env  - svetlana58shpp@gmail.com
import algoliasearch from 'algoliasearch/lite';

const client = algoliasearch(
    process.env.NEXT_PUBLIC_PRIKHODY_APPLICATIONID,
    process.env.NEXT_PUBLIC_PRIKHODY_SEARCHONLYAPIKEY
);

const locationsAlgoliaIndex = client.initIndex(process.env.NEXT_PUBLIC_PRIKHODY_INDEX_NAME_1);

import MapBounds from "./useMapBounds";

import { getDatabase, ref, child, get } from "firebase/database";
import NPPlaceMarker from "./NPPlaceMarker";
import IndicateButton, {sendTGMessage} from "./IndicateButton";
import Select from "react-select";
import useMarkersBounds from "./useMarkersBounds";
import BoundsToMapItems from "./BoundsToMapItems";
import NoFoundPrikhod from "./NoFoundPrikhod";
import {useGAnalytics} from "./useGAnalytics";
import useFirebaseAuth from "./useFirebaseAuth";
import {useList} from "react-firebase-hooks/database";

export const MapApp = () => {
    const filterBarRef = React.useRef(null);
    const resultListRef = React.useRef(null);
    const app = useFirebaseAuth();
    const [currentLocIdInPopUp, setCurrentLocIdInPopUp] = React.useState<any>();
    const [zoomToBounds, setZoomToBounds] = React.useState<boolean>(false);
    const [currentPrikhodNPs, setCurrentPrikhodNPs] = React.useState<any>([]);
    const [currentNotFoundPrikhodNPs, setCurrentNotFoundPrikhodNPs] = React.useState<any>([]);
    const [currentDescriptionItem, setCurrentDescriptionItem] = React.useState<any>();
    const [snapshots, loading, error] = useList(ref(getDatabase(app), `prikhods/${currentLocIdInPopUp?.objectID}`));

    useGAnalytics('G-D24N93Y7CD');

    React.useEffect(() => {
        const found: Array<any> = [];
        const notFound: Array<any> = [];
        currentDescriptionItem?.nps?.map((value: any) => {
                if (value.coords?.length) {
                    found.push(value);
                } else {
                    notFound.push(value);
                }
                return value;
            });
        setCurrentNotFoundPrikhodNPs(notFound);
        setCurrentPrikhodNPs(found);

    }, [currentDescriptionItem]);

    React.useEffect(() => {
        const vvv = snapshots?.reduce((previousValue: any, currentValue: any) => {
            previousValue[currentValue.key] = currentValue.val();
            return previousValue;
        }, {});
        setCurrentDescriptionItem(vvv);
    }, [snapshots]);

    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isPopUpOpen, setIsPopUpOpen] = React.useState<boolean>(false);
    const [searchTerm, setSearchTerm] = React.useState<string>('');
    const [isTypoTolerance, setIsTypoTolerance] = React.useState<boolean>(true);
    const [isShowPanel, setIsShowPanel] = React.useState<boolean>(false);
    const [isShowNotFoundPanel, setIsShowNotFoundPanel] = React.useState<boolean>(false);
    const [facets, setFacets] = React.useState<any>({});
    const [gOptions, setgOptions] = React.useState<any>([]);
    const [uOptions, setuOptions] = React.useState<any>([]);
    const [gFilter, setgFilter] = React.useState<string>('');
    const [uFilter, setuFilter] = React.useState<string>('');

    const [mapHits, setMapHits] = React.useState<Array<any>>([]);
    const [noMapHits, setNoMapHits] = React.useState<Array<any>>([]);
    const [mapBounds, setMapBounds] = React.useState<any>({});

    const size = useWindowSize();
    const markersBounds = useMarkersBounds(mapHits);
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    React.useEffect(() => {
        debouncedSearchTerm && setZoomToBounds(true);
    }, [debouncedSearchTerm]);

    React.useEffect(() => {
        if (facets && facets.g) {
            const g = Object.keys(facets.g).sort()
                .map((lang, index) =>
                    ({
                        label: `${lang} (${facets.g[lang]})`,
                        value: lang
                    }))
            setgOptions(g);
        }
        if (facets && facets.u) {
            const u = Object.keys(facets.u).sort()
                .map((lang, index) =>
                    ({
                        label: `${lang} (${facets.u[lang]})`,
                        value: lang
                    }))
            setuOptions(u);
        }
    }, [facets]);

    React.useEffect(() => {
        if (isLoading) {
            document.body.classList.add('loading');
        } else {
            document.body.classList.remove('loading');
        }
    }, [isLoading]);

    const searchHandler = ({target}: any) => {
        setSearchTerm(target.value);
    }

    const keysHandler = (e: any) => {
        if (e.which == 27) {
            setSearchTerm('');
        }
    };

    const [rootWith, setRootWith] = React.useState(0);
    const [filterBarHeight, setFilterBarHeight] = React.useState(0);
    const [footerHeight, setFooterHeight] = React.useState(0);

    React.useEffect(() => {
        const resultList = resultListRef ? resultListRef.current : null;
        const filterBar = filterBarRef ? filterBarRef.current : null;
        const root = document.querySelector('body');
        if (filterBar) {
            setFilterBarHeight(filterBar.clientHeight);
        }
        if (resultList) {
            setFooterHeight(resultList.clientHeight);
        }
        if (root) {
            setRootWith(root.clientWidth);
        }
    }, [size]);

    React.useEffect(() => {
        if (isPopUpOpen) {return;}
        setIsLoading(true);
        const facetFilters: any = [];

        if (gFilter.length) {
            facetFilters.push(`g:${gFilter}`)
        }
        if (uFilter.length) {
            facetFilters.push(`u:${uFilter}`)
        }

        let insideBoundingBox;
        if (mapBounds._northEast || mapBounds.length) {
            insideBoundingBox = [[
                mapBounds._northEast.lat,
                mapBounds._northEast.lng,
                mapBounds._southWest.lat,
                mapBounds._southWest.lng
            ]];
        }
        let filters = ``;

        locationsAlgoliaIndex.search(debouncedSearchTerm.length ? debouncedSearchTerm : '', {
            facets: ['u', 'g'],
            facetFilters,
            hitsPerPage: 150,
            typoTolerance: isTypoTolerance,
            filters,
            insideBoundingBox
        })
            .then(({hits, facets}: any) => {
                setFacets(facets);

                const withCoords: Array<any> = [];
                const noCoords: Array<any> = [];
                hits.forEach((hit: any) => {
                    if (hit._geoloc?.lat) {
                        withCoords.push(hit);
                    } else {
                        noCoords.push(hit);
                    }
                });
                setMapHits(withCoords);
                setNoMapHits(noCoords);
                setIsLoading(false);
            });
    }, [debouncedSearchTerm, mapBounds, gFilter, uFilter]);

    const selectCallback = React.useCallback((hit: any) => {
        setCurrentLocIdInPopUp(hit);
        setIsShowPanel(true);
    }, []);

    const popupclose= React.useCallback(() => setIsPopUpOpen(false), []);
    const popupopen = React.useCallback(() => setIsPopUpOpen(true), []);

    return <>
        {
            isLoading ? <>
                <Spinner animation="border" />
            </> : <></>
        }
        <div id="filter-bar" ref={filterBarRef}>
            <FilterBar
                {
                    ...{
                        searchHandler,
                        keysHandler,
                        searchTerm,
                        isTypoTolerance, setIsTypoTolerance,
                    }
                }
            >
                <Select className="select-filter white-space-nowrap"
                        isClearable={true}
                        isLoading={isLoading}
                        options={uOptions}
                        placeholder={'Уезд/Район'}
                        onChange={(e: any) => {
                            setuFilter(e?.value || '');
                            e?.value && setZoomToBounds(true);
                        }}
                />
                {
                    !!noMapHits?.length ? <div id="info-panel-label-button" onClick={() => setIsShowNotFoundPanel(true)}>
                        <Badge bg="warning" text="dark">
                            Не найденные на карте<br/>приходы
                        </Badge>
                    </div> : <></>
                }
            </FilterBar>
        </div>
        <MapContainer
            attributionControl={false}
            id="map"
            key="map"
            center={[53.902287, 27.561824]}
            zoom={7}

            trackResize={true}
            scrollWheelZoom={true}
            zoomControl={false}
            style={{position: 'relative'}}
        >
            <BoundsToMapItems
                bounds={zoomToBounds ? markersBounds : null}
                callback={() => {
                    setZoomToBounds(false);
                }}
            />
            <MapBounds setMapBounds={setMapBounds} />
            <SetMapSizeOnChange top={`${filterBarHeight}px`} height={`calc(100vh - ${footerHeight + filterBarHeight}px)`}/>
            <LayersControlComponent rootWith={rootWith}/>
            {
                mapHits.map((hit: any, index: number) => {
                    return <PrikhodPlaceMarker
                            popupclose={popupclose}
                            popupopen={popupopen}
                            key={hit.objectID}
                            hit={hit}
                            isMobile={rootWith < 800}
                            setCurrentLocIdInPopUp={setCurrentLocIdInPopUp}
                            selectCallback={selectCallback}
                    >
                        <IndicateButton item={hit} setIsShowPanel={setIsShowPanel} label="Сменить местоположение" />
                        {
                            !!currentNotFoundPrikhodNPs?.length ? <div id="info-panel-label-button" onClick={() => setIsShowNotFoundPanel(true)}>
                                <Badge bg="warning" text="dark">
                                    Не найденные на карте<br/>населенные пункты прихода
                                </Badge>
                            </div> : <></>
                        }
                    </PrikhodPlaceMarker>
                })
            }
            {
                currentPrikhodNPs?.map((np: any) => {
                    if (~np.title.indexOf(currentLocIdInPopUp?.pTitle)) {
                        return <></>
                    }
                    return <NPPlaceMarker key={np.objectID} hit={np} prikhod={currentLocIdInPopUp} color={currentLocIdInPopUp.src ? !!~currentLocIdInPopUp.title.indexOf('церковь') ? 'red' : 'blue' : 'black'} />
                })
            }


            <div className="result-list">
                <ul className={`nav nav-tabs tab-list-of-types ${isShowPanel ? 'active' : ''}`}
                    onClick={(event: any) => {
                    }}>
                </ul>
                <Modal show={isShowPanel} fullscreen={true} onHide={() => setIsShowPanel(false)}>
                    <Modal.Header className="modal-header-box">
                        <div className="breadcrumbs-header">
                            <CloseButton onClick={() => setIsShowPanel(false)} />&emsp;
                            <span><i>{currentLocIdInPopUp?.year}</i> &gt; </span>
                            <span><i>{currentLocIdInPopUp?.eparchy}</i> &gt; </span>
                            <span><i>{currentLocIdInPopUp?.deanery}</i> &gt; </span>
                            <span><i>{currentLocIdInPopUp?.pTitle}</i></span>
                        </div>
                        <ul className={`nav nav-tabs tab-list-of-types ${isShowPanel ? 'active' : ''}`}
                            onClick={(event: any) => {
                                if (event.target.closest('.nav-item')) {
                                    if (event.target.classList.contains('active')) {
                                        setIsShowPanel(false);
                                    }
                                    if (!isShowPanel) {
                                        setIsShowPanel((prev: boolean) => !prev);
                                    }
                                } else {
                                    setIsShowPanel((prev: boolean) => !prev);
                                }
                            }}>
                        </ul>
                    </Modal.Header>
                    <Modal.Body>
                        <b style={{textTransform: 'capitalize', whiteSpace: 'nowrap'}}>{currentLocIdInPopUp?.pType ? `${currentLocIdInPopUp?.pType} ` : ''}{currentLocIdInPopUp?.pTitle}</b>
                        <h6 style={{textTransform: 'capitalize', whiteSpace: 'nowrap'}}>{currentLocIdInPopUp?.title}</h6>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header><b>Сохранность в архивах (год, фонд, опись, архив)</b></Accordion.Header>
                                <Accordion.Body>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Control as="textarea" placeholder="Прислать сохранность по приходу" rows={3} id="new-fod-text" />
                                            <Button variant="secondary" type="button" onClick={() => {
                                                const newFodText: any = document.getElementById('new-fod-text');
                                                if (newFodText.value.length > 10 && newFodText.value.length < 4096) {
                                                    const pre = `src:prikhody\n\`${currentLocIdInPopUp.objectID}\``;
                                                    const msg = `${pre}\n${newFodText.value}`;
                                                    sendTGMessage(msg)
                                                        .then(() => {
                                                            alert("Отправлено!");
                                                            newFodText.value = '';
                                                        });
                                                }
                                            }}>Отправить</Button>
                                        </Form.Group>
                                    </Form>
                                    {
                                        currentDescriptionItem?.archives ? <>
                                            <ListGroup>
                                                {
                                                    currentDescriptionItem.archives?.map((value: any, index: number) => {
                                                        const {arTitle, description, year, note, link} = value;

                                                        let fond;
                                                        if (~description.indexOf('НИАБ')) {
                                                            description?.split(' ').reduce((previousValue: string, currentValue: string) => {
                                                                if (~previousValue.toLowerCase().indexOf('фонд')) {
                                                                    fond = currentValue.replace(/[^0-9.]/g, '');
                                                                }
                                                                return currentValue;
                                                            }, '')
                                                        }

                                                        return <ListGroup.Item key={index}>
                                                            <span>{year}</span>
                                                            &emsp;
                                                            <span title={arTitle} dangerouslySetInnerHTML={{__html: description?.replace(fond, `<a target="_blank" href="https://shappoff.github.io/niab/?q=${fond}">${fond}</a>`)}}></span>
                                                            &emsp;
                                                            <span>{note}</span>
                                                            &emsp;
                                                            {
                                                                link ? <a target="_blank" href={link}>familysearch.org</a> : <></>
                                                            }
                                                        </ListGroup.Item>
                                                    })
                                                }
                                            </ListGroup>
                                        </> : <></>
                                    }
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header><b>Список селений, которые относились к приходу церкви</b></Accordion.Header>
                                <Accordion.Body className="np-cards-result">
                                    {
                                        currentDescriptionItem?.nps ? <>
                                            {
                                                currentDescriptionItem.nps?.map((item: any, index: number) => {
                                                    return <Card key={index} className="card-np-item" style={{  }}>
                                                        <Card.Body>
                                                            <Card.Title><span dangerouslySetInnerHTML={{__html: item.title}} /></Card.Title>
                                                            <span>
                                                                {
                                                                    item.coords?.length ? <></> :
                                                                        <IndicateButton setIsShowPanel={setIsShowPanel} item={item} />
                                                                }
                                                            </span>
                                                        </Card.Body>
                                                        {/*&emsp;*/}

                                                    </Card>
                                                })
                                            }
                                        </> : <></>
                                    }
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Modal.Body>
                    <Modal.Footer>
                            <div>{currentLocIdInPopUp?.g.join(', ')}</div>
                            <div>{currentLocIdInPopUp?.u.join(', ')}</div>
                            <div>{currentLocIdInPopUp?.v.join(', ')}</div>
                    </Modal.Footer>
                </Modal>
            </div>

            <div id="info-panel" ref={resultListRef}>
                <div className="info-panel">

                    <Offcanvas show={isShowNotFoundPanel} onHide={() => {
                        setIsShowNotFoundPanel(false);
                    }}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Не найдены на карте:</Offcanvas.Title>

                        </Offcanvas.Header>
                        <Offcanvas.Body>

                            {
                                currentNotFoundPrikhodNPs?.length ? <>
                                    <NoFoundPrikhod hit={currentLocIdInPopUp} setIsShowNotFoundPanel={setIsShowNotFoundPanel} />
                                </> : <></>
                            }
                            {
                                noMapHits.map((hit: any, index: number) => {
                                    return <NoFoundPrikhod key={hit.objectID} hit={hit} setIsShowNotFoundPanel={setIsShowNotFoundPanel} />
                                })
                            }
                        </Offcanvas.Body>
                    </Offcanvas>
                </div>
            </div>
        </MapContainer>
    </>;
};

