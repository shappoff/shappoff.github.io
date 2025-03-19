'use client'

import PrikhodPlaceMarker from "@/app/prikhody1/PrikhodPlaceMarker";
import Link from "next/link";

import {useList} from "react-firebase-hooks/database";
import useFirebaseAuth from "@/components/prikhody/useFirebaseAuth";
import React from "react";
import {getDatabase, ref} from "firebase/database";
import NPPlaceMarker from "@/components/prikhody/NPPlaceMarker";


const Markers = ({items}: any) => {
    const isDev = !!~location.search.indexOf('debug');

    const app = useFirebaseAuth();

    const [currentLocIdInPopUp, setCurrentLocIdInPopUp] = React.useState<any>([]);
    const [currentPrikhodNPs, setCurrentPrikhodNPs] = React.useState<any>([]);
    const [currentNotFoundPrikhodNPs, setCurrentNotFoundPrikhodNPs] = React.useState<any>([]);
    const [currentDescriptionItem, setCurrentDescriptionItem] = React.useState<any>();
    const [snapshots, loading, error] = useList(ref(getDatabase(app), `prikhods/${currentLocIdInPopUp[0]}`));

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



    return <React.Fragment>
        {
            items.map((hit: any, indexMarker: number) => {
                const [objectID, title, pTitle, pType, lat, lng, src, atd] = hit;
                return lat && lng ? <PrikhodPlaceMarker
                    key={objectID + indexMarker}
                    hit={hit}
                    isMobile={true}
                    isDev={isDev}
                    setCurrentLocIdInPopUp={setCurrentLocIdInPopUp}
                >
                    <Link href={`/prikhody1/p/${objectID}`}><big>Подробнее</big></Link>
                </PrikhodPlaceMarker> : <></>
            })
        }
        {
            currentPrikhodNPs?.map((np: any) => {
                if (~np.title.indexOf(currentLocIdInPopUp[2])) {
                    return <></>
                }
                return <NPPlaceMarker key={np.objectID} hit={np} prikhod={currentLocIdInPopUp} color={+currentLocIdInPopUp[6] ? !!~currentLocIdInPopUp[1].indexOf('церковь') ? 'red' : 'blue' : 'black'} />
            })
        }
    </React.Fragment>
};

export default Markers;
