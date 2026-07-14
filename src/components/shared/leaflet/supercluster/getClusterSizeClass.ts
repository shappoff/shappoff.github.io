export type ClusterSizeClass = 'small' | 'medium' | 'large';

/** Size buckets from the official Supercluster Leaflet demo. */
export const getClusterSizeClass = (pointCount: number): ClusterSizeClass => {
    if (pointCount < 100) {
        return 'small';
    }

    if (pointCount < 1000) {
        return 'medium';
    }

    return 'large';
};

const CLUSTER_ICON_SIZE: Record<ClusterSizeClass, number> = {
    small: 36,
    medium: 44,
    large: 52,
};

export const getClusterIconSize = (sizeClass: ClusterSizeClass): number =>
    CLUSTER_ICON_SIZE[sizeClass];
