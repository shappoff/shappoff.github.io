'use client'

import HomeButton from "@/components/HomeButton";
import React from "react";
import SearchInputControl from "@/components/niab/SearchInputControl";
import SelectDropDown from "@/components/niab/SelectDropDown";
import TypoToleranceCheckbox from "@/components/niab/TypoToleranceCheckbox";
import SliderController from "@/components/niab/SliderController";

let count = 0;

const NavBarNIAB = ({
                        searchHandler,
                        searchTerm,
                        facets,
                        setStoreFilter,
                        setCurrentPage,
                        setLangFilter,
                        isTypoTolerance,
                        setIsTypoTolerance,
                        yearsRangeFilter,
                        yearsMinMax,
                        setYearsRangeFilter
                    }: any) => {
    console.log(++count, 'NavBarNIAB:render');
    return (
        <div id="navbar" className="filter-bar">
            <div className="first-raw">
                <HomeButton absolute={false} variant={true} />
                <SearchInputControl
                    searchHandler={searchHandler}
                    searchTerm={searchTerm}
                />
            </div>
            <div className="second-raw noselect">
                <SelectDropDown
                    facets={facets?.storage || {}}
                    setStoreFilter={setStoreFilter}
                    setCurrentPage={setCurrentPage}
                    placeholder={'№ хранилища'}
                />
                <SelectDropDown
                    facets={facets?.lang || {}}
                    setStoreFilter={setLangFilter}
                    setCurrentPage={setCurrentPage}
                    placeholder={'Язык фонда'}
                />
                <TypoToleranceCheckbox
                    isTypoTolerance={isTypoTolerance} setIsTypoTolerance={setIsTypoTolerance}
                />
            </div>
            <div className="third-raw">
                <SliderController
                    yearsRangeFilter={yearsRangeFilter}
                    yearsMinMax={yearsMinMax}
                    setYearsRangeFilter={setYearsRangeFilter}
                />
            </div>
        </div>
    );
};

export default NavBarNIAB;
