import React from "react";
import Pagination from 'react-bootstrap/Pagination';

const FondyNIABPagination = ({currentPage, setCurrentPage, nbPages}: any) => (
    <Pagination>
        <Pagination.First onClick={() => setCurrentPage(0)} disabled={currentPage === 0} />
        <Pagination.Prev onClick={() => setCurrentPage((v: number) => --v)} disabled={currentPage === 0} />
        {
            nbPages && Array(nbPages).fill('').map((n: string, page: number) => {
                return <Pagination.Item key={page} active={page === currentPage} onClick={() => setCurrentPage(page)}>
                    {page + 1}
                </Pagination.Item>
            })
        }
        <Pagination.Next onClick={() => setCurrentPage((v: number) => ++v)} disabled={currentPage === (nbPages - 1)} />
        <Pagination.Last onClick={() => setCurrentPage(nbPages - 1)} disabled={currentPage === (nbPages - 1)} />
    </Pagination>
);

export default FondyNIABPagination; 