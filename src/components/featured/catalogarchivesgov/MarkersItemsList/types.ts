import { CatalogArchiveHit } from '@/components/featured/catalogarchivesgov/PlaceMarker';

export type MarkerItem = CatalogArchiveHit;

export interface MarkersItemsListProps {
    items?: MarkerItem[];
}
