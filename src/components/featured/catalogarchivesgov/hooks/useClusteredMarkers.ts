'use client';

import { startTransition, useCallback, useEffect, useMemo, useState } from 'react';
import { useMap } from 'react-leaflet';

import { MarkerIndexItem } from '../types';
import {
    createMarkerClusterIndex,
    getPaddedMapBoundingBox,
    MarkerClusterPoint,
} from '../utils/cluster';

export type { MarkerClusterFeature, MarkerClusterPoint, MarkerPointFeature } from '../utils/cluster';

export const useClusteredMarkers = (items: MarkerIndexItem[]) => {
    const map = useMap();
    const [clusters, setClusters] = useState<MarkerClusterPoint[]>([]);

    // Index once per dataset; Supercluster treats load() as immutable afterwards.
    const index = useMemo(() => createMarkerClusterIndex(items), [items]);

    const updateClusters = useCallback(() => {
        if (!map) {
            return;
        }

        const bbox = getPaddedMapBoundingBox(map.getBounds());
        const zoom = Math.round(map.getZoom());
        const nextClusters = index.getClusters(bbox, zoom) as MarkerClusterPoint[];

        // Keep pan/zoom responsive — cluster state updates are deferred.
        startTransition(() => {
            setClusters(nextClusters);
        });
    }, [index, map]);

    const getClusterExpansionZoom = useCallback(
        (clusterId: number) => index.getClusterExpansionZoom(clusterId),
        [index],
    );

    useEffect(() => {
        let frameId = 0;

        // Coalesce bursty map events into one paint-frame update.
        // Only subscribe to moveend: Leaflet also fires it after zoom.
        const scheduleUpdate = () => {
            cancelAnimationFrame(frameId);
            frameId = requestAnimationFrame(updateClusters);
        };

        updateClusters();
        map.on('moveend', scheduleUpdate);

        return () => {
            cancelAnimationFrame(frameId);
            map.off('moveend', scheduleUpdate);
        };
    }, [map, updateClusters]);

    return { clusters, getClusterExpansionZoom };
};
