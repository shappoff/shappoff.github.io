'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Supercluster from 'supercluster';
import { useMap } from 'react-leaflet';

import { MarkerIndexItem } from '../types';
import {
    CLUSTER_OPTIONS,
    getMapBoundingBox,
    MarkerClusterPoint,
    toSuperclusterPoints,
} from '../utils/cluster';

export type { MarkerClusterFeature, MarkerClusterPoint, MarkerPointFeature } from '../utils/cluster';

export const useClusteredMarkers = (items: MarkerIndexItem[]) => {
    const map = useMap();
    const [clusters, setClusters] = useState<MarkerClusterPoint[]>([]);

    const index = useMemo(() => {
        const clusterIndex = new Supercluster(CLUSTER_OPTIONS);
        clusterIndex.load(toSuperclusterPoints(items));

        return clusterIndex;
    }, [items]);

    const updateClusters = useCallback(() => {
        const bbox = getMapBoundingBox(map.getBounds());
        const zoom = Math.floor(map.getZoom());

        setClusters(index.getClusters(bbox, zoom) as MarkerClusterPoint[]);
    }, [index, map]);

    const getClusterExpansionZoom = useCallback(
        (clusterId: number) => index.getClusterExpansionZoom(clusterId),
        [index],
    );

    useEffect(() => {
        updateClusters();

        map.on('moveend', updateClusters);
        map.on('zoomend', updateClusters);

        return () => {
            map.off('moveend', updateClusters);
            map.off('zoomend', updateClusters);
        };
    }, [map, updateClusters]);

    return { clusters, getClusterExpansionZoom };
};
