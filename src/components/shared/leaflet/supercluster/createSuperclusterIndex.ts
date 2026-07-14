import Supercluster from 'supercluster';

import type { ClusterPointFeature, GeoJsonProperties } from './types';

export const createSuperclusterIndex = <
    P extends GeoJsonProperties,
    C extends GeoJsonProperties,
>(
    points: Array<ClusterPointFeature<P>>,
    options?: Supercluster.Options<P, C>,
) => {
    const index = new Supercluster<P, C>(options);
    index.load(points);

    return index;
};
