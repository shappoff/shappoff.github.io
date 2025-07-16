import React from "react";
import Pagination from 'react-bootstrap/Pagination';
let count = 0;
interface IPaginationProps {
    currentPage: number;
    nbPages: number;
    setCurrentPage: (n: number | Function) => void;
}

function PaginationNIAB({currentPage = 0, nbPages = 0, setCurrentPage}: IPaginationProps) {
    console.log(++count, 'PaginationNIAB:render', currentPage, nbPages);
    return (<>
        <Pagination>
            <Pagination.First onClick={() => setCurrentPage(0)} disabled={currentPage === 0} />
            <Pagination.Prev onClick={() => setCurrentPage((v: number) => --v)} disabled={currentPage === 0} />
            {
                Number.isInteger(nbPages) && Array(nbPages).fill('').map((_: string, page: number) => {
                    return <Pagination.Item key={page} active={page === currentPage} onClick={() => setCurrentPage(page)}>
                        {page + 1}
                    </Pagination.Item>
                })
            }
            <Pagination.Next onClick={() => setCurrentPage((v: number) => ++v)} disabled={currentPage === (nbPages - 1)} />
            <Pagination.Last onClick={() => setCurrentPage(nbPages - 1)} disabled={currentPage === (nbPages - 1)} />
        </Pagination>
    </>);
}

export default React.memo(PaginationNIAB);
