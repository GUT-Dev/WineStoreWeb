import "./Pagination.css";

const Pagination = (props) => {

    const PaginationElement = ({i}) => {
        return (
            <div className={i === props.pageInfo.currentPage ? 'pagination-element active' : 'pagination-element'}
                 onClick={() => props.setPage(i)}>
                <p>{i + 1}</p>
            </div>
        );
    }

    const getArray = (size) => {
        let array = [];
        for (let i = 0; i < size; i++) {
            array.push(i);
        }

        return array;
    }

    return (
        <div className="pagination-container">
            <div className="pagination-content">
                {getArray(props.pageInfo.totalPages).map(i =>
                    <PaginationElement i={i}/>
                )}
            </div>
        </div>
    )

}

export default Pagination;