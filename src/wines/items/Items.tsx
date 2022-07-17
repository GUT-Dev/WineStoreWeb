import './Items.css';
import Item from "./item/Item";
import {useEffect, useState} from "react";
import Pagination from "../../common/Pagination";
import {getWinesPage} from "../../API/productAPI";
import {Page} from "../../model/wine/Pageable";
import {WineTable} from "../../model/wine/Products";

export default ({filters}: { filters: string }) => {

    const [page, setPage] = useState<Page<WineTable>>();
    const [currentPage, setCurrentPage] = useState(0);
    const [sort, setSort] = useState<string>("id,desc");
    const [offset, setOffset] = useState(15);

    const getPageRequest = () => {
        return filters + "&page=" + currentPage + "&size=" + offset + "&sort=" + sort;
    }

    useEffect(() => {
        getWinesPage(getPageRequest())
            .then(r => {
                    setPage(r);
                }
            )
    }, [filters, sort, currentPage]);

    return (
        <div className="items-block">
            <div className="items-header">
                <p>Знайдено товарів: {page?.totalElements}</p>
                <div>
                    Сортування по:
                    <select value={sort} onChange={(event) => setSort(event.target.value)}>
                        <option selected value="id,desc">Новинки</option>
                        <option value="price,asc">Ціна: за зростанням</option>
                        <option value="price,desc">Ціна: по спаданню</option>
                        <option value="soldAmount,asc">Популярність: за зростанням</option>
                        <option value="soldAmount,desc">Популярність: по спаданню</option>
                    </select>
                </div>
            </div>
            <div className="items">
                {page?.content.map(item =>
                    <Item item={item}/>
                )}
            </div>
            <Pagination currentPage={page?.number} totalPages={page?.totalPages} setPage={setCurrentPage}/>
        </div>
    );
};