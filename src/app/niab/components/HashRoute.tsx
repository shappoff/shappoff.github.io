export const SPLITTER = '-|';

export class HashRoute {
    url: any;

    constructor(href: string) {
        this.url = new URL(href);
    }

    add(key: string, value: string) {
        if (value) {
            this.url.searchParams.set(key, value);
        } else {
            this.url.searchParams.delete(key);
        }
        this.updateAll();
    }

    take(key: string) {
        return this.url.searchParams.get(key) || '';
    }

    private updateAll() {
        history.pushState({}, "", this.url);
    }
}