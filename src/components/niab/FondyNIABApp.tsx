'use client'
import React from "react";
import useDebounce from "../useDebounce";
import Spinner from 'react-bootstrap/Spinner';
import PaginationNIAB from "@/components/niab/Pagination";

import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';

import FondCard from "./FondCard";
import {HashRoute} from "./HashRoute";

import algoliasearch from 'algoliasearch/lite';
import {fondNmbToObjectId} from "@/components/utils";
import NavBarNIAB from "@/components/niab/NavBarNIAB";
import SearchInputControl from "@/components/niab/SearchInputControl";

const HASH_MAP = {
    query: 'q',
};

declare const process: any;
// grigorysh58@gmail.com
const client = algoliasearch(
    process.env.NEXT_PUBLIC_NIAB_ALGOLIA_APPLICATION_ID,
    process.env.NEXT_PUBLIC_NIAB_ALGOLIA_SEARCH_ONLY_API_KEY
);

const algoliaIndex = client.initIndex('foandyniab');

const FondyNIABApp = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [searchTerm, setSearchTerm] = React.useState<string>('');
    const [isTypoTolerance, setIsTypoTolerance] = React.useState<boolean>(true);
    const [langFilter, setLangFilter] = React.useState<string>();
    const [storeFilter, setStoreFilter] = React.useState<number>();
    const [resultsAll, setResultsAll] = React.useState<Array<any>>([]);
    const [yearsRangeFilter, setYearsRangeFilter] = React.useState<Array<any>>([]);
    const [facetsStats, setFacetsStats] = React.useState<any>();
    const [yearsMinMax, setYearsMinMax] = React.useState<Array<any>>([]);
    const [nbPages, setNbPages] = React.useState<number>(0);
    const [currentPage, setCurrentPage] = React.useState<number>(0);
    const [facets, setFacets] = React.useState<any>({});
    const [route, setRoute] = React.useState<any>();

    const debouncedSearchTerm = useDebounce(searchTerm, 1500);

    React.useEffect(() => {
        const effRouter = new HashRoute(window.location.href);
        const fond = effRouter.take(HASH_MAP.query);
        if (fond) {

            const isID = isNaN(+fond);

            if (!isID && fond.length) {
                const url = new URL(location.href);
                url.searchParams.delete('q');
                url.pathname = `/niab/${fond}`;
                location.href = url.href;
                return;
            }


            setIsLoading(true);
            setSearchTerm(fond);
            setCurrentPage(0);
        }
        setRoute(effRouter);

        var prevScrollpos = window.pageYOffset;
        const navbar: HTMLElement | null = document.getElementById("navbar");
        const controlNavbar = () => {
            var currentScrollPos = window.pageYOffset;
            if (currentScrollPos > 100 && navbar) {
                if (prevScrollpos > currentScrollPos) {
                    navbar.classList.remove('down');
                    navbar.classList.add('up');
                } else {
                    navbar.classList.remove('up');
                    navbar.classList.add('down');
                }
                prevScrollpos = currentScrollPos;
            }
        }
        window.addEventListener('scroll', controlNavbar);

        return () => {
            window.removeEventListener('scroll', controlNavbar);
        };
    }, []);

    React.useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    React.useEffect(() => {
        if (isLoading) {
            document.body.classList.add('loading');
        } else {
            document.body.classList.remove('loading');
        }
    }, [isLoading]);

    async function algoliaSearch() {

        if (!route || (route.take(HASH_MAP.query) && !debouncedSearchTerm)) {
            return;
        }
        const isID = isNaN(+debouncedSearchTerm);

        setIsLoading(true);

        let filters: string = '';

        const dRange = facetsStats?.dRange;
        if (dRange && (yearsRangeFilter[0] === dRange.min && yearsRangeFilter[1] === dRange.max)) {

        } else if (yearsRangeFilter.length) {
            const dotFrom = +new Date(`${yearsRangeFilter[0]}-01-01 00:00:00`) / 1000;
            const dotTo = +new Date(`${yearsRangeFilter[1]}-12-31 23:59:59`) / 1000;

            const fr = `datesRange.from >= ${dotFrom} AND datesRange.to > ${dotFrom}`;
            const to = `datesRange.from >= ${dotTo} AND datesRange.to > ${dotTo}`;
            filters = `(datesRange.to > ${dotFrom} AND datesRange.from <= ${dotTo})`
        }

        const facetFilters: any = [];
        if (langFilter) {
            facetFilters.push([`lang:${langFilter}`]);
        }

        if (storeFilter) {
            facetFilters.push([`storage:${storeFilter}`]);
        }

        if (!isID && debouncedSearchTerm) {
            facetFilters.push(`objectID:${fondNmbToObjectId(debouncedSearchTerm)}`);
        }

        const searched = await algoliaIndex.search(isID ? debouncedSearchTerm : '', {
            responseFields: ['facets', 'hits', 'nbPages', 'page', 'facets_stats'],
            typoTolerance: isTypoTolerance,
            analytics: true,
            facets: ['lang', 'dRange', 'storage'],
            facetFilters,
            filters,
            page: currentPage
        });

        const {hits, facets, nbPages, page, facets_stats} = searched;
        setFacetsStats(facets_stats);
        if (!yearsMinMax.length) {
            setYearsMinMax([facets_stats?.dRange.min, facets_stats?.dRange.max]);
        }
        if (!yearsRangeFilter.length) {
            setYearsRangeFilter([facets_stats?.dRange.min, facets_stats?.dRange.max]);
        }
        setCurrentPage(page);
        setNbPages(nbPages);
        setResultsAll(hits);
        setFacets(facets);
        setIsLoading(false);
        return searched;
    }

    const searchHandler = ({target}: any) => {
        setIsLoading(true);
        setSearchTerm(target.value);
        setCurrentPage(0);
        route.add(HASH_MAP.query, target.value);
    }

    const keysHandler = (e: any) => {
        if (e.which == 27) {
            setSearchTerm('');
            setCurrentPage(0);
            route.add(HASH_MAP.query, '');
        }
    };

    const { isPending, isError, data, error } = useQuery({ queryKey: ['algoliaSearch'], queryFn: algoliaSearch })

    return <div id="root">
        <NavBarNIAB
            keysHandler={keysHandler}
            facets={facets}
            setStoreFilter={setStoreFilter}
            setCurrentPage={setCurrentPage}
            setLangFilter={setLangFilter}
            isTypoTolerance={isTypoTolerance}
            setIsTypoTolerance={setIsTypoTolerance}
            yearsRangeFilter={yearsRangeFilter}
            yearsMinMax={yearsMinMax}
            setYearsRangeFilter={setYearsRangeFilter}
        >
            <SearchInputControl
                searchHandler={searchHandler}
                searchTerm={searchTerm}
            />
        </NavBarNIAB>

        <div className="list-result">
            {
                resultsAll.map((item: any, index: number) => {
                    return <FondCard key={item.objectID} index={index} item={item} />
                })
            }
        </div>
        <PaginationNIAB currentPage={currentPage} nbPages={nbPages} setCurrentPage={setCurrentPage} />
        {
            isLoading || isPending ? <>
                <Spinner animation="border" />
            </> : <></>
        }
    </div>;
};

export default FondyNIABApp;


