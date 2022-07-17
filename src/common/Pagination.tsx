import "./Pagination.css";
import React from "react";

const Pagination = ({currentPage, totalPages, setPage}: {currentPage : number | undefined, totalPages: number | undefined, setPage: Function}) => {

    const PaginationElement = ({pageNumber}: {pageNumber : number}) => {
        return (
            <div className={pageNumber === currentPage ? 'pagination-element active' : 'pagination-element'}
                 onClick={() => setPage(pageNumber)}>
                <p>{pageNumber + 1}</p>
            </div>
        );
    }

    const getArray = (size: number) => {
        let array = [];
        for (let i = 0; i < size; i++) {
            array.push(i);
        }

        return array;
    }

    return (
        <div className="pagination-container">
            <div className="pagination-content">
                {getArray(totalPages === undefined ? 0 : totalPages).map(i =>
                    <PaginationElement pageNumber={i}/>
                )}
            </div>
        </div>
    )

}

export default Pagination;