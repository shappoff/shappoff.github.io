import React from "react";
import Pagination from '@mui/material/Pagination';

const FondyNIABPagination = ({currentPage, setCurrentPage, nbPages}: any) => (
    <Pagination
        count={nbPages}
        page={currentPage + 1}
        onChange={(_event, value) => setCurrentPage(value - 1)}
        color="primary"
        showFirstButton
        showLastButton
    />
);

export default FondyNIABPagination; 