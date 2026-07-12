import { CatalogDataset, MarkerIndexItem } from '@/components/featured/catalogarchivesgov/types';

export type MarkerItem = MarkerIndexItem;

export interface MarkersItemsListProps {
    items?: MarkerIndexItem[];
    dataset: CatalogDataset;
}
