'use client';

import { memo } from 'react';
import { Marker, useMap } from 'react-leaflet';

import { createCachedDivIcon } from '@/components/shared/leaflet/createCachedDivIcon';

import { MarkerClusterFeature } from '../utils/cluster';

interface ClusterMarkerProps {
    cluster: MarkerClusterFeature;
    getClusterExpansionZoom: (clusterId: number) => number;
}

const getClusterIcon = (count: number) =>
    createCachedDivIcon(`cluster-${count}`, {
        className: 'marker-cluster-icon',
        html: `<div style="background:#2c3e50;color:#fff;border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.3);">${count}</div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
    });

const ClusterMarker = ({ cluster, getClusterExpansionZoom }: ClusterMarkerProps) => {
    const map = useMap();
    const [lng, lat] = cluster.geometry.coordinates;
    const count = cluster.properties.point_count;

    return (
        <Marker
            position={[lat, lng]}
            icon={getClusterIcon(count)}
            eventHandlers={{
                click: () => {
                    const expansionZoom = getClusterExpansionZoom(cluster.id as number);
                    map.setView([lat, lng], expansionZoom);
                },
            }}
        />
    );
};

export default memo(ClusterMarker);
