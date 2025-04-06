'use client'

import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './prikhody.css';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {MapContainer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import 'react-leaflet-markercluster/styles';
import CyrillicToTranslit from 'cyrillic-to-translit-js';

const cyrillicToTranslit: any = new (CyrillicToTranslit as any);
import {useRouter} from 'next/navigation';
import {usePathname} from 'next/navigation';

import {useWindowSize} from "@/components/prikhody/useWindowSize";
import LayersControlComponent from "@/components/prikhody/LayersControlComponent";
import SetMapSizeOnChange from "@/components/prikhody/SetMapSizeOnChange";
import useDebounce from "@/components/useDebounce";

import algoliasearch from 'algoliasearch/lite';
import WrapToMarkerClusterGroup from "@/app/prikhody/WrapToMarkerClusterGroup";
declare const process: any;

const client = algoliasearch(
    process.env.NEXT_PUBLIC_PPFF_ALGOLIA_APPLICATION_ID,
    process.env.NEXT_PUBLIC_PPFF_ALGOLIA_SEARCH_API_KEY
);

const prikhodyIndex = client.initIndex('prikhodyIndex');

const PrikhodyMapApp = ({children, items}: any) => {
    const filterBarRef = React.useRef(null);
    const pathname = usePathname();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [selectedPrikhodItem, setSelectedPrikhodItem] = React.useState<any>();
    const [selectedATDItem, setSelectedATDItem] = React.useState<any>();
    const [searchTerm, setSearchTerm] = React.useState<string>('');
    const [isTypoTolerance, setIsTypoTolerance] = React.useState<boolean>(true);
    const [uOptions, setuOptions] = React.useState<any>([]);
    const [prikhodyDataArray, setPrikhodyDataArray] = React.useState<any>([]);

    const size = useWindowSize();
    const router = useRouter();
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    const [rootWith, setRootWith] = React.useState(0);
    const [filterBarHeight, setFilterBarHeight] = React.useState(0);
    const [footerHeight, setFooterHeight] = React.useState(0);

    React.useEffect(() => {

        setPrikhodyDataArray([]);
        if (debouncedSearchTerm && debouncedSearchTerm.length) {
            setIsLoading(true);
            prikhodyIndex.search(debouncedSearchTerm, {
                hitsPerPage: 1000,
                typoTolerance: isTypoTolerance
            })
                .then(({hits}: any) => {

                    const withCoords: Array<any> = [];
                    const noCoords: Array<any> = [];
                    hits.forEach((hit: any) => {
                        if (hit._geoloc?.lat) {
                            const {objectID, title, pTitle, pType, _geoloc, src, atd} = hit;
                            withCoords.push([objectID, title, pTitle, pType, _geoloc.lat, _geoloc.lng, src, atd.join('|')]);
                        } else {
                            noCoords.push(hit);
                        }
                    });
                    setPrikhodyDataArray(withCoords);
                }).finally(() => {
                setIsLoading(false);
            });
        } else {
            setPrikhodyDataArray([]);
        }

    }, [debouncedSearchTerm]);

    React.useEffect(() => {
        const resultList: any = document.getElementById('slide-panel-info1') ? document.getElementById('slide-panel-info1') : null;
        const filterBar: any = filterBarRef ? filterBarRef.current : null;
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
        setSearchTerm('');
        if (~pathname.indexOf('/p/')) {
            setIsLoading(false);
            const selectedPathnameId = pathname.slice(pathname.indexOf('/p/')).replaceAll('/p/', '').replaceAll('/', '');
            const selectedPrikhod = items.find((item: any) => {
                return item[0] === selectedPathnameId
            });

            setSelectedPrikhodItem({
                label: `${selectedPrikhod[3]} ${selectedPrikhod[2]}, ${selectedPrikhod[1]}`,
                value: selectedPrikhod[0],
            });
        }
    }, [pathname]);

    React.useEffect(() => {
        const atdObj: any = {};
        items.forEach(([, , , , , , , atdStr]: any) => {
            if (atdStr) {
                const atdList = atdStr.split('|');
                atdList.forEach((atd: string) => {
                    const converted = cyrillicToTranslit.transform(atd.trim(), '_').toLowerCase();
                    if (!atdObj[converted]) {
                        atdObj[converted] = atd.trim();
                    }
                });
            }
        });
        const optionsItmes = Object.keys(atdObj).map((hit: any) => {
            return ({
                label: atdObj[hit],
                value: hit
            })
        });

        setuOptions(optionsItmes.sort((a: any, b: any) => a.label.localeCompare(b.label)));
    }, [items]);

    const searchHandler = (event: any) => {
        if (event?.target.value) {
            setIsLoading(true);
        }
        setSearchTerm(event?.target.value);
    }

    const keysHandler = (e: any) => {
        if (e.which == 27) {
            setSearchTerm('');
        }
    };
    const goBack = () => {
        if (history.length > 2) {
            router.back();
        } else {
            router.push('/prikhody')
        }
    };
    React.useEffect(() => {
        const dd = uOptions.find((v: any) => {
            return ~location.href.indexOf(v.value);
        });
        setSelectedATDItem(dd);
    }, [uOptions]);

    return (~pathname.indexOf('atd') || ~pathname.indexOf('/p/')) && pathname.split('/').filter((v: string) => !!v).length < 3 ?
        children :
        <div>
            <div key="filter-bar" id="filter-bar" ref={filterBarRef}>
                <Box
                    component="form"
                    sx={{ '& > :not(style)': { m: 1, width: '25ch' }, width: '100%', display: 'flex' }}
                    noValidate
                    autoComplete="off"
                >
                    <Autocomplete
                        value={selectedPrikhodItem ? selectedPrikhodItem : ''}
                        size="small"
                        id="search-atd-input"
                        loading={isLoading}
                        onInputChange={searchHandler}
                        disablePortal
                        noOptionsText="Не найдено результатов"
                        onFocus={(e: any) => {
                            e.target.parentNode.parentNode.parentNode.style.flexGrow = 3;
                        }}
                        onBlur={(e: any) => {
                            e.target.parentNode.parentNode.parentNode.style.flexGrow = 1;
                        }}
                        options={prikhodyDataArray.map(([objectID, title, pTitle, pType, lat, lng, src, atd]: any) => {
                            return {
                                label: `${pType} ${pTitle}, ${title}`,
                                value: objectID,
                            };
                        })}
                        sx={{ flexGrow: 1 }}
                        onChange={(event: any, newValueItem: any | null) => {
                            if (newValueItem && newValueItem.value) {
                                setSelectedPrikhodItem(newValueItem);
                                router.push(`/prikhody/p/${newValueItem.value}`);
                            } else {
                                if (~pathname.indexOf('/p/')) {
                                    setSelectedPrikhodItem(void(0));
                                    goBack();
                                } else {
                                    router.push(`/prikhody`);
                                }
                            }
                        }}
                        renderInput={(params) => <TextField {...params} label="Церковь / Костел" placeholder="Начните вводить" />}
                    />
                    <Autocomplete
                        value={selectedATDItem ? selectedATDItem : ''}
                        size="small"
                        id="search-atd-input"
                        disablePortal
                        onFocus={(e: any) => {
                            e.target.parentNode.parentNode.parentNode.style.flexGrow = 3;
                        }}
                        onBlur={(e: any) => {
                            e.target.parentNode.parentNode.parentNode.style.flexGrow = 1;
                        }}
                        options={uOptions}
                        sx={{ flexGrow: 1 }}
                        onChange={(event: any, newValueItem: any | null) => {
                            if (newValueItem && newValueItem.value) {
                                router.push(`/prikhody/atd/${newValueItem.value}`);
                                setSelectedATDItem(newValueItem);
                            } else {
                                setSelectedATDItem(void(0));
                                if (~pathname.indexOf('/p/')) {
                                    setSelectedPrikhodItem(null);
                                    goBack();
                                } else {
                                    router.push(`/prikhody`);
                                }
                            }
                        }}
                        renderInput={(params) => <TextField {...params} label="Уезд / Район" />}
                    />
                </Box>
            </div>
            {
                isLoading ? <Box sx={{ position: 'absolute', top: '50%', right: '50%', zIndex: 1000 }}>
                    <CircularProgress />
                </Box> : <></>
            }
            <MapContainer
                attributionControl={false}
                id="map"
                key="map1"
                center={[53.902287, 27.561824]}
                zoom={7}

                trackResize={true}
                scrollWheelZoom={true}
                zoomControl={false}
                style={{position: 'relative'}}
            >
                <SetMapSizeOnChange key="SetMapSizeOnChange" top={`${filterBarHeight}px`}
                                    height={`calc(100vh - ${footerHeight + filterBarHeight}px)`}/>
                <LayersControlComponent key="LayersControlComponent" rootWith={rootWith}/>
                {
                    prikhodyDataArray.length && !~pathname.indexOf('/p/') ? <>
                        <WrapToMarkerClusterGroup items={prikhodyDataArray} />
                    </> : children
                }
            </MapContainer>
        </div>;
};

export default PrikhodyMapApp;

