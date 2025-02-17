'use client'

import dynamic from "next/dynamic";
import React from "react";

export default function PrikhodyMapPage() {
  const MapApp = React.useMemo(() => dynamic(
      () => import('@/components/prikhody/PrikhodyMapApp'),
      {
        loading: () => <p>A map is loading</p>,
        ssr: false
      }
  ), [])
  return <MapApp key="map-page" />;
}
