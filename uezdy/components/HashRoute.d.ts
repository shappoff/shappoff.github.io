export declare const SPLITTER = "-|";
export declare class HashRoute {
    url: any;
    constructor(href: string);
    add(key: string, value: string): void;
    take(key: string): any;
    private updateAll;
}
