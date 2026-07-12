'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Supercluster from 'supercluster';
import { useMap } from 'react-leaflet';

import { MarkerIndexItem } from '../types';

type MarkerProperties = {
    naId: string | number;
    title2?: string;
};

type ClusterProperties = {
    cluster: true;
    point_count: number;
    point_count_abbreviated: string | number;
};

export type MarkerClusterPoint =
    | Supercluster.PointFeature<MarkerProperties>
    | Supercluster.ClusterFeature<ClusterProperties>;

const CLUSTER_OPTIONS: Supercluster.Options<MarkerProperties, ClusterProperties> = {
    radius: 60,
    maxZoom: 14,
    minZoom: 0,
};

export const useClusteredMarkers = (items: MarkerIndexItem[]) => {
    const map = useMap();
    const [clusters, setClusters] = useState<MarkerClusterPoint[]>([]);

    const index = useMemo(() => {
        const clusterIndex = new Supercluster<MarkerProperties, ClusterProperties>(CLUSTER_OPTIONS);

        clusterIndex.load(
            items.map((item) => ({
                type: 'Feature',
                properties: {
                    naId: item.naId,
                    title2: item.title2,
                },
                geometry: {
                    type: 'Point',
                    coordinates: [item.lng, item.lat],
                },
            })),
        );

        return clusterIndex;
    }, [items]);

    const updateClusters = useCallback(() => {
        const bounds = map.getBounds();
        const zoom = Math.floor(map.getZoom());
        const bbox: [number, number, number, number] = [
            bounds.getWest(),
            bounds.getSouth(),
            bounds.getEast(),
            bounds.getNorth(),
        ];

        setClusters(index.getClusters(bbox, zoom) as MarkerClusterPoint[]);
    }, [index, map]);

    useEffect(() => {
        updateClusters();

        map.on('moveend', updateClusters);
        map.on('zoomend', updateClusters);

        return () => {
            map.off('moveend', updateClusters);
            map.off('zoomend', updateClusters);
        };
    }, [map, updateClusters]);

    const getClusterExpansionZoom = useCallback(
        (clusterId: number) => index.getClusterExpansionZoom(clusterId),
        [index],
    );

    return { clusters, getClusterExpansionZoom };
};
