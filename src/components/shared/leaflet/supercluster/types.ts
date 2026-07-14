import type { GeoJsonProperties } from 'geojson';
import type Supercluster from 'supercluster';

export type { GeoJsonProperties };

export type ClusterPointFeature<P extends GeoJsonProperties = GeoJsonProperties> =
    Supercluster.PointFeature<P>;

export type ClusterFeature<C extends GeoJsonProperties = GeoJsonProperties> =
    Supercluster.ClusterFeature<C>;

export type ClusterOrPointFeature<
    P extends GeoJsonProperties = GeoJsonProperties,
    C extends GeoJsonProperties = GeoJsonProperties,
> = ClusterPointFeature<P> | ClusterFeature<C>;

export type SuperclusterInstance<
    P extends GeoJsonProperties = GeoJsonProperties,
    C extends GeoJsonProperties = GeoJsonProperties,
> = Supercluster<P, C>;
