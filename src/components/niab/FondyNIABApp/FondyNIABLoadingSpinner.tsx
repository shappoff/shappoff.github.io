import React from "react";
import CircularProgress from '@mui/material/CircularProgress';

const FondyNIABLoadingSpinner = ({isLoading}: any) => (
    isLoading ? <>
        <CircularProgress />
    </> : <></>
);

export default FondyNIABLoadingSpinner; 