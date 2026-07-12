'use client';

import { memo, useMemo } from 'react';
import { DivIcon } from 'leaflet';
import { Marker, useMap } from 'react-leaflet';

import { MarkerClusterPoint } from '../hooks/useClusteredMarkers';

interface ClusterMarkerProps {
    cluster: MarkerClusterPoint;
    getClusterExpansionZoom: (clusterId: number) => number;
}

const createClusterIcon = (count: number) =>
    new DivIcon({
        className: 'marker-cluster-icon',
        html: `<div style="background:#2c3e50;color:#fff;border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.3);">${count}</div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
    });

const isClusterFeature = (
    cluster: MarkerClusterPoint,
): cluster is Extract<MarkerClusterPoint, { properties: { cluster: true } }> =>
    'cluster' in cluster.properties && cluster.properties.cluster === true;

const ClusterMarker = ({ cluster, getClusterExpansionZoom }: ClusterMarkerProps) => {
    const map = useMap();

    if (!isClusterFeature(cluster)) {
        return null;
    }

    const [lng, lat] = cluster.geometry.coordinates;
    const count = cluster.properties.point_count;
    const icon = useMemo(() => createClusterIcon(count), [count]);

    return (
        <Marker
            position={[lat, lng]}
            icon={icon}
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
