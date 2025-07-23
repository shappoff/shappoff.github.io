'use client'

import React from "react";
import HomeButton from "@/components/shared/HomeButton";
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
                        yearsMinMax,
                        setYearsRangeFilter,
                        children
                    }: any) => {

    return (
        <div id="navbar" className="filter-bar">
            <Box sx={{ '& > :not(style)': { ml: 1, mr: 1, mt: 0.5, mb: 0.5 } }}
                 component="div"
                 className="first-raw"
            >
                <HomeButton absolute={false} variant={true} />
                {children}
            </Box>
            <Box sx={{ '& > :not(style)': { ml: 1, mr   : 1 } }} className="second-raw noselect">
                <SelectDropDown
                    facets={facets?.storage || {}}
                    selected={storeFilter}
                    placeholder="№ хранилища"
                >{(event: SelectChangeEvent) => {
                            setCurrentPage(0);
                            setStoreFilter(event?.target.value);
                }}</SelectDropDown>
                <SelectDropDown
                    facets={facets?.lang || {}}
                    selected={langFilter}
                    placeholder="Язык фонда"
                >{(event: SelectChangeEvent) => {
                    setCurrentPage(0);
                    setLangFilter(event?.target.value);
                }}</SelectDropDown>
                <TypoToleranceCheckbox
                    isTypoTolerance={isTypoTolerance} setIsTypoTolerance={setIsTypoTolerance}
                />
            </Box>
            <div className="third-raw">
                <SliderController
                    yearsMinMax={yearsMinMax}
                    setYearsRangeFilter={setYearsRangeFilter}
                />
            </div>
        </div>
    );
};

export default NavBarNIAB;
