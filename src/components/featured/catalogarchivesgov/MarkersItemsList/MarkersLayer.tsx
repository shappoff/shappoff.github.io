'use client';

import { memo } from 'react';

import ClusterMarker from '@/components/featured/catalogarchivesgov/ClusterMarker/ClusterMarker';
import PlaceMarker from '@/components/featured/catalogarchivesgov/PlaceMarker';
import { useClusteredMarkers } from '@/components/featured/catalogarchivesgov/hooks/useClusteredMarkers';
import { CatalogDataset, MarkerIndexItem } from '@/components/featured/catalogarchivesgov/types';

interface MarkersLayerProps {
    items: MarkerIndexItem[];
    dataset: CatalogDataset;
}

const isPointFeature = (
    cluster: ReturnType<typeof useClusteredMarkers>['clusters'][number],
): cluster is Extract<
    ReturnType<typeof useClusteredMarkers>['clusters'][number],
    { properties: { naId: string | number } }
> => !('cluster' in cluster.properties);

const MarkersLayer = ({ items, dataset }: MarkersLayerProps) => {
    const { clusters, getClusterExpansionZoom } = useClusteredMarkers(items);

    return (
        <>
            {clusters.map((cluster) => {
                if ('cluster' in cluster.properties && cluster.properties.cluster) {
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

                const { naId, title2 } = cluster.properties;
                const [lng, lat] = cluster.geometry.coordinates;

                return (
                    <PlaceMarker
                        key={String(naId)}
                        item={{ naId, lat, lng, title2 }}
                        dataset={dataset}
                    />
                );
            })}
        </>
    );
};

export default memo(MarkersLayer);
