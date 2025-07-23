import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

// Define type for FilterBar props
interface FilterBarProps {
    searchHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    keysHandler: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    searchTerm: string;
    setPlaceTerm?: (term: string) => void;
    isTypoTolerance: boolean;
    setIsTypoTolerance: (val: boolean) => void;
    placeFilterOptions?: unknown;
    currentLocId?: string;
    setCurrentLocId?: (id: string) => void;
    defaultFacets?: unknown;
    setUezdFilter?: (val: string) => void;
    children?: React.ReactNode;
}

const FilterBar = ({
                       searchHandler,
                       keysHandler,
                       searchTerm,
                       setPlaceTerm,
                       isTypoTolerance,
                       setIsTypoTolerance,
                       placeFilterOptions,
                       currentLocId,
                       setCurrentLocId,
                       defaultFacets,
                       setUezdFilter,
                        children
                   }: FilterBarProps) => {
    return <>
        <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
        >
            <TextField size="small" value={searchTerm} onChange={searchHandler} id="outlined-basic" label="Церковь / Костел" variant="outlined" />
        </Box>
        {children}
    </>
};

export default FilterBar;
