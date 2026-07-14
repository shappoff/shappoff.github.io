'use client';

import { memo } from 'react';

import ClusterMarker from '@/components/featured/catalogarchivesgov/ClusterMarker';
import PlaceMarker from '@/components/featured/catalogarchivesgov/PlaceMarker';
import { useClusteredMarkers } from '@/components/featured/catalogarchivesgov/hooks/useClusteredMarkers';
import { CatalogDataset, MarkerIndexItem } from '@/components/featured/catalogarchivesgov/types';
import { isClusterFeature, isPointFeature, toMarkerIndexItem } from '@/components/featured/catalogarchivesgov/utils/cluster';

interface MarkersLayerProps {
    items: MarkerIndexItem[];
    dataset: CatalogDataset;
}

const MarkersLayer = ({ items, dataset }: MarkersLayerProps) => {
    const { clusters, getClusterExpansionZoom } = useClusteredMarkers(items);

    return (
        <>
            {clusters.map((cluster) => {
                if (isClusterFeature(cluster)) {
                    return (
                        <ClusterMarker
                            key={`cluster-${cluster.id}`}
                            cluster={cluster}
                            getClusterExpansionZoom={getClusterExpansionZoom}
                        />
                    );
                }

                if (!isPointFeature(cluster)) {
                    return null;
                }

                return (
                    <PlaceMarker
                        key={String(cluster.properties.naId)}
                        item={toMarkerIndexItem(cluster)}
                        dataset={dataset}
                    />
                );
            })}
        </>
    );
};

export default memo(MarkersLayer);
