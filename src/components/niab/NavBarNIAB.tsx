'use client'

import React from "react";
import HomeButton from "@/components/HomeButton";
import SelectDropDown from "@/components/niab/SelectDropDown";
import TypoToleranceCheckbox from "@/components/niab/TypoToleranceCheckbox";
import SliderController from "@/components/niab/SliderController";
import Box from '@mui/material/Box';


const NavBarNIAB = ({
                        facets,
                        setStoreFilter,
                        setCurrentPage,
                        setLangFilter,
                        isTypoTolerance,
                        setIsTypoTolerance,
                        yearsRangeFilter,
                        yearsMinMax,
                        setYearsRangeFilter,
                        children
                    }: any) => {

    return (
        <div id="navbar" className="filter-bar">
            <Box sx={{ '& > :not(style)': { m: 1 } }}
                 noValidate
                 autoComplete="off"
                 className="first-raw"
            >
                <HomeButton absolute={false} variant={true} />
                {children}
            </Box>
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
                {/* TODO fix it */}
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
