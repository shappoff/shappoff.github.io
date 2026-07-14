'use client';

import { memo } from 'react';

import ClusterMarker from '@/components/featured/catalogarchivesgov/ClusterMarker/ClusterMarker';
import PlaceMarker from '@/components/featured/catalogarchivesgov/PlaceMarker';
import { useClusteredMarkers } from '@/components/featured/catalogarchivesgov/hooks/useClusteredMarkers';
import { CatalogDataset, MarkerIndexItem } from '@/components/featured/catalogarchivesgov/types';
import { toMarkerIndexItem } from '@/components/featured/catalogarchivesgov/utils/cluster';
import { isClusterFeature, isPointFeature } from '@/components/shared/leaflet/supercluster/clusterFeatureGuards';

interface MarkersLayerProps {
    items: MarkerIndexItem[];
    dataset: CatalogDataset;
}

const MarkersLayer = ({ items, dataset }: MarkersLayerProps) => {
    const { clusters, getClusterExpansionZoom } = useClusteredMarkers(items);

    return (
        <>
            {clusters.map((feature) => {
                if (isClusterFeature(feature)) {
                    return (
                        <ClusterMarker
                            key={`cluster-${feature.id}`}
                            cluster={feature}
                            getClusterExpansionZoom={getClusterExpansionZoom}
                        />
                    );
                }

                if (!isPointFeature(feature)) {
                    return null;
                }

                return (
                    <PlaceMarker
                        key={String(feature.properties.naId)}
                        item={toMarkerIndexItem(feature)}
                        dataset={dataset}
                    />
                );
            })}
        </>
    );
};

export default memo(MarkersLayer);
