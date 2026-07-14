'use client';

import { memo } from 'react';
import { Marker, useMap } from 'react-leaflet';

import { createCachedDivIcon } from '@/components/shared/leaflet/createCachedDivIcon';

import {
    getClusterSizeTier,
    MarkerClusterFeature,
    type ClusterSizeTier,
} from '../utils/cluster';

interface ClusterMarkerProps {
    cluster: MarkerClusterFeature;
    getClusterExpansionZoom: (clusterId: number) => number;
}

const CLUSTER_TIER_STYLES: Record<
    ClusterSizeTier,
    { size: number; fontSize: number; background: string }
> = {
    small: { size: 36, fontSize: 13, background: '#34495e' },
    medium: { size: 44, fontSize: 14, background: '#2c3e50' },
    large: { size: 52, fontSize: 15, background: '#1a252f' },
};

const getClusterIcon = (count: number, label: string | number) => {
    const tier = getClusterSizeTier(count);
    const { size, fontSize, background } = CLUSTER_TIER_STYLES[tier];

    return createCachedDivIcon(`cluster-${tier}-${label}`, {
        className: `marker-cluster-icon marker-cluster-${tier}`,
        html: `<div style="background:${background};color:#fff;border-radius:50%;width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:${fontSize}px;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.3);">${label}</div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
    });
};

const ClusterMarker = ({ cluster, getClusterExpansionZoom }: ClusterMarkerProps) => {
    const map = useMap();
    const [lng, lat] = cluster.geometry.coordinates;
    const count = cluster.properties.point_count;
    const label = cluster.properties.point_count_abbreviated;

    return (
        <Marker
            position={[lat, lng]}
            icon={getClusterIcon(count, label)}
            eventHandlers={{
                click: () => {
                    const expansionZoom = Math.min(
                        getClusterExpansionZoom(cluster.id as number),
                        map.getMaxZoom(),
                    );
                    map.setView([lat, lng], expansionZoom, { animate: true });
                },
            }}
        />
    );
};

export default memo(ClusterMarker);
