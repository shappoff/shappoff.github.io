import type {
    ClusterFeature,
    ClusterOrPointFeature,
    ClusterPointFeature,
    GeoJsonProperties,
} from './types';

export const isClusterFeature = <P extends GeoJsonProperties, C extends GeoJsonProperties>(
    feature: ClusterOrPointFeature<P, C>,
): feature is ClusterFeature<C> =>
    Boolean(
        feature.properties &&
            'cluster' in feature.properties &&
            feature.properties.cluster === true,
    );

export const isPointFeature = <P extends GeoJsonProperties, C extends GeoJsonProperties>(
    feature: ClusterOrPointFeature<P, C>,
): feature is ClusterPointFeature<P> => !isClusterFeature(feature);

/** Avoid React re-renders when the viewport set of clusters/points is unchanged. */
export const areClusterSetsEqual = <P extends GeoJsonProperties, C extends GeoJsonProperties>(
    previous: Array<ClusterOrPointFeature<P, C>>,
    next: Array<ClusterOrPointFeature<P, C>>,
): boolean => {
    if (previous.length !== next.length) {
        return false;
    }

    for (let i = 0; i < previous.length; i += 1) {
        const prevFeature = previous[i];
        const nextFeature = next[i];

        if (prevFeature.id !== nextFeature.id) {
            return false;
        }

        if (isClusterFeature(prevFeature) && isClusterFeature(nextFeature)) {
            if (prevFeature.properties.point_count !== nextFeature.properties.point_count) {
                return false;
            }
            continue;
        }

        if (
            prevFeature.geometry.coordinates[0] !== nextFeature.geometry.coordinates[0] ||
            prevFeature.geometry.coordinates[1] !== nextFeature.geometry.coordinates[1]
        ) {
            return false;
        }
    }

    return true;
};
