export interface Page<T> {
    content: T [],
    empty: boolean,
    first: boolean,
    last: boolean,
    number: number,
    numberOfElements: boolean,
    pageable: Pageable,
    size: number,
    sort: Sort,
    totalElements: number,
    totalPages: number,
}

interface Pageable {
    sort: Sort,
    offset: number,
    pageNumber: number,
    pageSize: number,
    paged: boolean,
    unpaged: boolean,
}

interface Sort {
    empty: boolean,
    sorted: boolean,
    unsorted: boolean,
}