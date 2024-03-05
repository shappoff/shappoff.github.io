import { default as React } from 'react';
import 'rc-slider/assets/index.css';
export interface ItemOption {
    readonly value: string;
    readonly label: string;
    readonly uezd: string;
}
export interface GroupedOption {
    readonly label: string;
    readonly options: readonly ItemOption[];
}
declare const FindMetrics: () => React.JSX.Element;
export default FindMetrics;
