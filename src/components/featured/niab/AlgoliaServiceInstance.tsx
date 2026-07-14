import { liteClient } from 'algoliasearch/lite';

declare const process: any;

const INDEX_NAME = 'foandyniab';

const client = liteClient(
    process.env.NEXT_PUBLIC_NIAB_ALGOLIA_APPLICATION_ID,
    process.env.NEXT_PUBLIC_NIAB_ALGOLIA_SEARCH_ONLY_API_KEY
);

const algoliaIndex = {
    search: async (query: string, searchParams?: Record<string, unknown>) => {
        const { results } = await client.searchForHits({
            requests: [{
                indexName: INDEX_NAME,
                query,
                ...searchParams,
            }],
        });
        return results[0];
    },
};

export default algoliaIndex;
