import React from 'react';
export interface ItemOption {
    readonly value: string;
    readonly label: string;
}
export declare const lepelskiyUezd: readonly ItemOption[];
export interface GroupedOption {
    readonly label: string;
    readonly options: readonly ItemOption[];
}
export declare const groupedOptions: readonly GroupedOption[];
declare const App: () => React.JSX.Element;
export default App;
