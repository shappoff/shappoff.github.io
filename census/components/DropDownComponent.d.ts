import { default as React } from 'react';
export interface ColourOption {
    readonly value: string;
    readonly label: string;
    readonly color: string;
    readonly isFixed?: boolean;
    readonly isDisabled?: boolean;
}
export declare const DropDownComponent: React.FC<any>;
