import algoliasearch from 'algoliasearch/lite';

declare const process: any;

const client = algoliasearch(
    process.env.NEXT_PUBLIC_NIAB_ALGOLIA_APPLICATION_ID,
    process.env.NEXT_PUBLIC_NIAB_ALGOLIA_SEARCH_ONLY_API_KEY
);

const algoliaIndex = client.initIndex('foandyniab');


export default algoliaIndex;
