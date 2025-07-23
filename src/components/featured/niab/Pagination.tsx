import React, {ChangeEvent, Dispatch, SetStateAction} from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface IPaginationProps {
    currentPage: number;
    nbPages: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
}

function PaginationNIAB({currentPage = 0, nbPages = 0, setCurrentPage}: IPaginationProps) {
    function changePageHandler(e: ChangeEvent<unknown>, page: number) {
        setCurrentPage(page)
    }
    return <Stack spacing={2} sx={{mb: 5, mt: 5}}>
        <Pagination count={nbPages} variant="outlined" shape="rounded" page={currentPage} onChange={changePageHandler} />
    </Stack>
}

export default React.memo(PaginationNIAB);
