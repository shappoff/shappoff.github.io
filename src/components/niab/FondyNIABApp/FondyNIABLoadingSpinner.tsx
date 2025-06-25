import React from "react";
import Spinner from 'react-bootstrap/Spinner';

const FondyNIABLoadingSpinner = ({isLoading}: any) => (
    isLoading ? <>
        <Spinner animation="border" />
    </> : <></>
);

export default FondyNIABLoadingSpinner; 