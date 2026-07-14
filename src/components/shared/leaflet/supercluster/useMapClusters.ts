'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type Supercluster from 'supercluster';
import { useMap } from 'react-leaflet';

import { areClusterSetsEqual } from './clusterFeatureGuards';
import { createSuperclusterIndex } from './createSuperclusterIndex';
import { getMapBoundingBox } from './getMapBoundingBox';
import type {
    ClusterOrPointFeature,
    ClusterPointFeature,
    GeoJsonProperties,
    SuperclusterInstance,
} from './types';

export interface UseMapClustersOptions<P extends GeoJsonProperties, C extends GeoJsonProperties> {
    points: Array<ClusterPointFeature<P>>;
    clusterOptions?: Supercluster.Options<P, C>;
    /** Expands bbox so markers don’t pop in at edges while panning. */
    bboxPaddingRatio?: number;
}

export interface UseMapClustersResult<P extends GeoJsonProperties, C extends GeoJsonProperties> {
    clusters: Array<ClusterOrPointFeature<P, C>>;
    index: SuperclusterInstance<P, C>;
    getClusterExpansionZoom: (clusterId: number) => number;
}

/**
 * Keeps a Supercluster index in sync with the Leaflet viewport.
 * Updates on moveend and on integer zoom steps so cluster expand feels progressive.
 */
export const useMapClusters = <P extends GeoJsonProperties, C extends GeoJsonProperties>({
    points,
    clusterOptions,
    bboxPaddingRatio = 0.25,
}: UseMapClustersOptions<P, C>): UseMapClustersResult<P, C> => {
    const map = useMap();
    const [clusters, setClusters] = useState<Array<ClusterOrPointFeature<P, C>>>([]);
    const lastZoomFloorRef = useRef<number | null>(null);

    const index = useMemo(
        () => createSuperclusterIndex(points, clusterOptions),
        [points, clusterOptions],
    );

    const updateClusters = useCallback(() => {
        const bbox = getMapBoundingBox(map.getBounds(), bboxPaddingRatio);
        const zoom = Math.floor(map.getZoom());
        lastZoomFloorRef.current = zoom;
        const nextClusters = index.getClusters(bbox, zoom) as Array<ClusterOrPointFeature<P, C>>;

        setClusters((previous) =>
            areClusterSetsEqual(previous, nextClusters) ? previous : nextClusters,
        );
    }, [bboxPaddingRatio, index, map]);

    const updateClustersOnZoomStep = useCallback(() => {
        const zoom = Math.floor(map.getZoom());

        if (lastZoomFloorRef.current === zoom) {
            return;
        }

        updateClusters();
    }, [map, updateClusters]);

    const getClusterExpansionZoom = useCallback(
        (clusterId: number) => {
            const expansionZoom = index.getClusterExpansionZoom(clusterId);
            const maxZoom = map.getMaxZoom();

            return Number.isFinite(maxZoom)
                ? Math.min(expansionZoom, maxZoom)
                : expansionZoom;
        },
        [index, map],
    );

    useEffect(() => {
        lastZoomFloorRef.current = null;
        updateClusters();

        map.on('moveend', updateClusters);
        map.on('zoom', updateClustersOnZoomStep);

        return () => {
            map.off('moveend', updateClusters);
            map.off('zoom', updateClustersOnZoomStep);
        };
    }, [map, updateClusters, updateClustersOnZoomStep]);

    return { clusters, index, getClusterExpansionZoom };
};
