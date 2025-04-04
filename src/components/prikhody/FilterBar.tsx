import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

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
                   }: any) => {
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
