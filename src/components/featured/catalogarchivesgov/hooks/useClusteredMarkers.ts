'use client';

import { useMemo } from 'react';

import { useMapClusters } from '@/components/shared/leaflet/supercluster';

import { MarkerIndexItem } from '../types';
import { CLUSTER_OPTIONS, toSuperclusterPoints } from '../utils/cluster';

export type {
    MarkerClusterFeature,
    MarkerClusterPoint,
    MarkerPointFeature,
} from '../utils/cluster';

export const useClusteredMarkers = (items: MarkerIndexItem[]) => {
    const points = useMemo(() => toSuperclusterPoints(items), [items]);

    const { clusters, getClusterExpansionZoom } = useMapClusters({
        points,
        clusterOptions: CLUSTER_OPTIONS,
    });

    return { clusters, getClusterExpansionZoom };
};
