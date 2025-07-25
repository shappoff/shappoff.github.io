'use client'
import React from "react";
import useDebounce from "../../shared/useDebounce";
import PaginationNIAB from "@/components/featured/niab/Pagination";

import { useQuery } from '@tanstack/react-query';

import FondCard from "./FondCard";
import {HashRoute} from "./HashRoute";

import {fondNmbToObjectId} from "@/components/utils";
import NavBarNIAB from "@/components/featured/niab/NavBarNIAB";
import SearchInputControl from "@/components/featured/niab/SearchInputControl";
import algoliaIndex from "@/components/featured/niab/AlgoliaServiceInstance";
import Spinner from "@/components/shared/Spinner";

const HASH_MAP = {
    query: 'q',
};

const FondyNIABApp = () => {
    const [searchTerm, setSearchTerm] = React.useState<string>('');
    const [isTypoTolerance, setIsTypoTolerance] = React.useState<boolean>(true);
    const [langFilter, setLangFilter] = React.useState<string>();
    const [storeFilter, setStoreFilter] = React.useState<number>();
    const [yearsRangeFilter, setYearsRangeFilter] = React.useState<Array<any>>([]);
    const [facetsStats, setFacetsStats] = React.useState<any>();
    const [yearsMinMax, setYearsMinMax] = React.useState<Array<any>>([]);
    const [currentPage, setCurrentPage] = React.useState<number>(0);
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
        const navbar: HTMLElement | null = document.getElementById("navbar");
        navbar?.classList.remove('down');
    }, [currentPage]);

    const algoliaSearch = React.useCallback(async function() {

        const isID = !isNaN(+debouncedSearchTerm);

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

        if (isID && debouncedSearchTerm) {
            facetFilters.push(`objectID:${fondNmbToObjectId(debouncedSearchTerm)}`);
        }

        const searched = await algoliaIndex.search(!isID ? debouncedSearchTerm : '', {
            responseFields: ['facets', 'hits', 'nbPages', 'page', 'facets_stats'],
            typoTolerance: isTypoTolerance,
            analytics: true,
            facets: ['lang', 'dRange', 'storage'],
            facetFilters,
            filters,
            page: currentPage
        });

        const {facets_stats} = searched;
        setFacetsStats(facets_stats);
        if (!yearsMinMax.length) {
            setYearsMinMax([facets_stats?.dRange.min, facets_stats?.dRange.max]);
        }
        if (!yearsRangeFilter.length) {
            setYearsRangeFilter([facets_stats?.dRange.min, facets_stats?.dRange.max]);
        }

        return searched;
    }, [
        currentPage,
        debouncedSearchTerm,
        isTypoTolerance,
        storeFilter,
        langFilter,
        yearsRangeFilter,
    ]);

    const searchHandler = ({target}: any) => {
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

    const { isPending, isError, data, error } = useQuery({
        queryKey: [currentPage, debouncedSearchTerm, isTypoTolerance, langFilter, storeFilter, yearsRangeFilter],
        queryFn: algoliaSearch
    });

    if (error) return <div>Ошибка: {error.message}</div>;
    if (isError) return <div>Ошибка: {isError}</div>;

    return <div id="root">
        <NavBarNIAB
            keysHandler={keysHandler}
            facets={data?.facets}
            setStoreFilter={setStoreFilter}
            storeFilter={storeFilter}
            setCurrentPage={setCurrentPage}
            setLangFilter={setLangFilter}
            langFilter={langFilter}
            isTypoTolerance={isTypoTolerance}
            setIsTypoTolerance={setIsTypoTolerance}
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
                data?.hits.map((item: any, index: number) => {
                    return <FondCard key={item.objectID} index={index} item={item} />
                })
            }
        </div>
        <PaginationNIAB currentPage={data?.page || 0} nbPages={data?.nbPages || 0} setCurrentPage={setCurrentPage} />
        {
            isPending ? <Spinner /> : <></>
        }
    </div>;
};

export default FondyNIABApp;


