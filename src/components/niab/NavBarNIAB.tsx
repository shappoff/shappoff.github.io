'use client'

import React from "react";
import HomeButton from "@/components/HomeButton";
import SelectDropDown from "@/components/niab/SelectDropDown";
import TypoToleranceCheckbox from "@/components/niab/TypoToleranceCheckbox";
import SliderController from "@/components/niab/SliderController";
import Box from '@mui/material/Box';
import {SelectChangeEvent} from "@mui/material";

const NavBarNIAB = ({
                        facets,
                        setStoreFilter,
                        storeFilter,
                        setCurrentPage,
                        setLangFilter,
                        langFilter,
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
                 component="div"
                 className="first-raw"
            >
                <HomeButton absolute={false} variant={true} />
                {children}
            </Box>
            <div className="second-raw noselect">
                <SelectDropDown
                    facets={facets?.storage || {}}
                    selected={storeFilter}
                    placeholder="№ хранилища"
                >{(event: SelectChangeEvent) => {
                            setCurrentPage(0);
                            setStoreFilter(event.target.value);
                }}</SelectDropDown>
                <SelectDropDown
                    facets={facets?.lang || {}}
                    selected={langFilter}
                    placeholder="Язык фонда"
                >{(event: SelectChangeEvent) => {
                    setCurrentPage(0);
                    setLangFilter(event.target.value);
                }}</SelectDropDown>
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
