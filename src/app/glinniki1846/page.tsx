'use client'

import {Metadata} from "next";
// import {MapApp} from "./MapApp";
import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(() => import('./MapApp'), { ssr: false });

/*
export const metadata: Metadata = {
    title: "1846 год, им. Глинник. Масштаб 1/8400.",
    description: "Лесохозяйственный план государственного имения Глинник. Масштаб 1/8400. Могилевский уезд, Могилевская губерния",
};
*/

export default function Glinniki1846() {
  return <DynamicComponentWithNoSSR />;
}
