'use client';

import { memo } from 'react';
import { Marker, useMap } from 'react-leaflet';

import { createCachedDivIcon } from '@/components/shared/leaflet/createCachedDivIcon';
import { getClusterIconSize, getClusterSizeClass } from '@/components/shared/leaflet/supercluster/getClusterSizeClass';

import { MarkerClusterFeature } from '../utils/cluster';

interface ClusterMarkerProps {
    cluster: MarkerClusterFeature;
    getClusterExpansionZoom: (clusterId: number) => number;
}

const CLUSTER_COLORS: Record<ReturnType<typeof getClusterSizeClass>, string> = {
    small: '#2c3e50',
    medium: '#1a5276',
    large: '#922b21',
};

const getClusterIcon = (pointCount: number, abbreviated: string | number) => {
    const sizeClass = getClusterSizeClass(pointCount);
    const size = getClusterIconSize(sizeClass);
    const background = CLUSTER_COLORS[sizeClass];

    return createCachedDivIcon(`cluster-${sizeClass}-${abbreviated}`, {
        className: `marker-cluster-icon marker-cluster-${sizeClass}`,
        html: `<div style="background:${background};color:#fff;border-radius:50%;width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:${sizeClass === 'large' ? 15 : 13}px;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.3);">${abbreviated}</div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
    });
};

const ClusterMarker = ({ cluster, getClusterExpansionZoom }: ClusterMarkerProps) => {
    const map = useMap();
    const [lng, lat] = cluster.geometry.coordinates;
    const { point_count: pointCount, point_count_abbreviated: abbreviated } = cluster.properties;
    const clusterId = (cluster.id as number) ?? cluster.properties.cluster_id;

    return (
        <Marker
            position={[lat, lng]}
            icon={getClusterIcon(pointCount, abbreviated)}
            eventHandlers={{
                click: () => {
                    const expansionZoom = getClusterExpansionZoom(clusterId);
                    map.flyTo([lat, lng], expansionZoom, { duration: 0.45 });
                },
            }}
        />
    );
};

export default memo(ClusterMarker);
