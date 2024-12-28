'use client'
import React from "react";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import useDebounce from "./useDebounce";
import Spinner from 'react-bootstrap/Spinner';
import Pagination from 'react-bootstrap/Pagination';

import FondCard from "./FondCard";
import {HashRoute} from "./HashRoute";

import Slider from 'rc-slider';
import SliderTooltip from "./SliderTooltip";
import {useGAnalytics} from "./useGAnalytics";
// import {algoliasearch} from "algoliasearch";
import algoliasearch from 'algoliasearch/lite';

const HASH_MAP = {
    query: 'q',
};
const plural = (number: number, titles: Array<string> = ['фонд', 'фонда', 'фондов']) => {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}
// grigorysh58@gmail.com
const client = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY);

const algoliaIndex = client.initIndex('foandyniab');

const MapApp = () => {
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

    useGAnalytics('G-BS71TCVL7J');

    const selectedFONDHandler = React.useCallback((fod: number) => {
        gtag('event', 'search', {
            fond: `${fod}`,
        });
    }, []);

    React.useEffect(() => {
        const effRouter = new HashRoute(window.location.href);
        const fond = effRouter.take(HASH_MAP.query);
        if (fond) {
            setIsLoading(true);
            setSearchTerm(fond);
            setCurrentPage(0);
            selectedFONDHandler(fond);
        }
        setRoute(effRouter);

        var prevScrollpos = window.pageYOffset;
        const navbar = document.getElementById("navbar");
        const controlNavbar = () => {
            var currentScrollPos = window.pageYOffset;
            if (currentScrollPos > 100) {
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
        if (isLoading) {
            document.body.classList.add('loading');
        } else {
            document.body.classList.remove('loading');
        }
    }, [isLoading]);

    React.useEffect(() => {

        if (!route || (route.take(HASH_MAP.query) && !debouncedSearchTerm)) {
            return;
        }
        const isID = isNaN(+debouncedSearchTerm);

        setIsLoading(true);

        let filters: string;

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
            facetFilters.push(`objectID:${normalazePageNumb(debouncedSearchTerm)}`);
        }

        algoliaIndex.search(isID ? debouncedSearchTerm : '', {
            responseFields: ['facets', 'hits', 'nbPages', 'page', 'facets_stats'],
            typoTolerance: isTypoTolerance,
            analytics: true,
            facets: ['lang', 'dRange', 'storage'],
            facetFilters,
            filters,
            page: currentPage
        })
            .then(({hits, facets, nbPages, page, facets_stats}: any) => {
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
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [debouncedSearchTerm, isTypoTolerance, langFilter, storeFilter, currentPage, yearsRangeFilter, route]);

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

    return <div id="root">
        <div id="navbar" className="filter-bar">
            <div className="first-raw">
                <Form.Control id="input-id"
                              placeholder="Название или номер фонда НИАБ"
                              enterKeyHint={'search'}
                              multiple={false}
                              autoFocus={true}
                              onInput={searchHandler}
                              onChange={keysHandler}
                              type="text"
                              className={'input-form-control'}
                              value={searchTerm}
                />
                {
                    searchTerm ? <div className="select__indicator select__clear-indicator css-1xc3v61-indicatorContainer"
                                      onClick={() => {
                                          if (searchTerm) {
                                              searchHandler({target: {value: ''}});
                                          }

                                          document.getElementById('input-id').focus({preventScroll: true});
                                      }}
                                      aria-hidden="true">
                        <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-tj5bde-Svg">
                            <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
                        </svg>
                    </div> : <></>
                }
            </div>
            <div className="second-raw noselect">
                <Select className="select-filter storage"
                        isClearable={true}
                        options={facets && facets.storage && Object.keys(facets.storage).map((lang, index) => ({label: `№ ${lang} (${facets.storage[lang]} ${plural(facets.storage[lang])})`, value: lang})) as any}
                        placeholder={'№ хранилища'}
                        onChange={(e: any) => {
                            setStoreFilter(e?.value);
                            setCurrentPage(0);
                        }}
                />
                <Select className="select-filter lang"
                        isClearable={true}
                        options={facets && facets.lang && Object.keys(facets.lang).map((lang, index) => ({label: `${lang} (${facets.lang[lang]} ${plural(facets.lang[lang])})`, value: lang})) as any}
                        placeholder={'Язык фонда'}
                        onChange={(e: any) => {
                            setLangFilter(e?.value);
                            setCurrentPage(0);
                        }}
                />
                <div className="form-check form-check-inline form-switch typo-tolerance">
                    <input className="form-check-input" type="checkbox"
                           role="switch" id="flexSwitchCheckDefault"
                           checked={!isTypoTolerance}
                           onChange={(e: any) => setIsTypoTolerance(!e.target.checked)}/>
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Точное совпадение</label>
                </div>
            </div>
            <div className="third-raw">
                {
                    yearsRangeFilter.length ? <Slider
                        handleRender={(renderProps: any) => {
                            return (
                                <div {...renderProps.props}>
                                    <SliderTooltip>{renderProps.props['aria-valuenow']}</SliderTooltip>
                                </div>
                            );
                        }}
                        range
                        min={yearsMinMax[0]}
                        max={yearsMinMax[1]}
                        defaultValue={yearsRangeFilter}
                        allowCross={false}
                        dots={false}
                        onChangeComplete={(e: any) => {setYearsRangeFilter(e)}}
                    /> : <></>
                }
            </div>
        </div>

        <div className="list-result">
            {
                resultsAll.map((item: any, index: number) => {
                    return <FondCard key={index} index={index} item={item} analytics={selectedFONDHandler} />
                })
            }
        </div>
        <Pagination>
            <Pagination.First onClick={() => setCurrentPage(0)} disabled={currentPage === 0} />
            <Pagination.Prev onClick={() => setCurrentPage((v: number) => --v)} disabled={currentPage === 0} />
            {
                nbPages && Array(nbPages).fill('').map((n: string, page: number) => {
                    return <Pagination.Item key={page} active={page === currentPage} onClick={() => setCurrentPage(page)}>
                        {page + 1}
                    </Pagination.Item>
                })
            }
            <Pagination.Next onClick={() => setCurrentPage((v: number) => ++v)} disabled={currentPage === (nbPages - 1)} />
            <Pagination.Last onClick={() => setCurrentPage(nbPages - 1)} disabled={currentPage === (nbPages - 1)} />
        </Pagination>
        {
            isLoading ? <>
                <Spinner animation="border" />
            </> : <></>
        }
    </div>;
};

export default MapApp;

function normalazePageNumb(page: string) {
    let additional = '';
    switch (page.length) {
        case 1:
            additional = '000';
            break;
        case 2:
            additional = '00';
            break;
        case 3:
            additional = '0';
            break;
        default:
            additional = '';
    }
    return `${additional}${page}`;
}

