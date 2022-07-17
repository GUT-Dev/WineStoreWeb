import './Wines.css';
import Items from "./items/Items";
import Nav from "./nav/Nav";
import {useCallback, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getMaxPrice, getMinPrice} from "../API/productAPI";
import {Filters, Price} from "../model/wine/Filters";

export const sweetnessTypes = [ "EXTRA_DRY", "DRY", "MEDIUM", "SWEET", "VERY_SWEET" ];
export const wineTypes = [ "WHITE", "RED", "ROSE", "SPARKLING", "FORTIFIED" ];

const Wines = (props: any) => {
    let [loaded, setLoaded] = useState(false);
    let [filters, setFilters] = useState<Filters>({
        sweetness: [],
        type: [],
        price: {
            min: 0,
            max: 100000,
        },
        hasDiscount: undefined,
        includeNotVisible: undefined
    });
    // @ts-ignore
    let searchByName = useSelector(state => state.searchByName);

    const load = useCallback(async () => {
        let minPrice = await getMinPrice();
        let maxPrice = await getMaxPrice();
        setFilters({...filters, price: {min: minPrice, max: maxPrice}});
        setLoaded(true);
    }, [])

    useEffect(() => {
        load();
    }, [props])

    const submit = (value: Price) => {
        setFilters(filters => {
            return {
                ...filters,
                price: {
                    min: value.min,
                    max: value.max
                }
            }
        })
    }

    const changeFilter = (param: any) => {
        if(param.checked) {
            addFilter(param.id)
        } else {
            removeFilter(param.id)
        }
    }

    const addFilter = (param: string) => {
        if (param === "discount") {
            setFilters(filters => {
                    return {
                        ...filters,
                        hasDiscount: true
                    }
                }
            )
        } else if (param === "includeNotVisible") {
            setFilters(filters => {
                return {
                    ...filters,
                    includeNotVisible: true
                }
            })
        } else if (sweetnessTypes.includes(param)) {
            setFilters(filters => {
                return {
                    ...filters,
                    sweetness: [...filters.sweetness, param]
                }
            })
        } else if (wineTypes.includes(param)) {
            setFilters(filters => {
                return {
                    ...filters,
                    type: [...filters.type, param]
                }
            })
        }
    }

    const removeFilter = (param: string) => {
        if (param === "discount") {
            setFilters(filters => {
                    return {
                        ...filters,
                        hasDiscount: undefined
                    }
                }
            )
        } else if (param === "includeNotVisible") {
            setFilters(filters => {
                return {
                    ...filters,
                    includeNotVisible: undefined
                }
            })
        } else if (sweetnessTypes.includes(param)) {
            let id = filters.sweetness.indexOf(param);
            // @ts-ignore
            filters.sweetness.splice(id, 1);
            setFilters(value => {
                return {
                    ...value,
                    sweetness: [...filters?.sweetness]
                }
            })
        } else if (wineTypes.includes(param)) {
            let id = filters.type.indexOf(param);
            filters.type.splice(id, 1);
            setFilters(value => {
                return {
                    ...value,
                    type: [...filters?.type]
                }
            })
        }
    }

    // @ts-ignore
    const crateQueryParams = (filters: Filters) => {
        let queryParams = '?'

        if(searchByName != null) {
            queryParams = queryParams.concat('name=' + searchByName + '&')
        }
        if(filters.hasDiscount != null) {
            queryParams = queryParams.concat('hasDiscount=' + filters.hasDiscount + '&')
        }
        if(filters.includeNotVisible != null) {
            queryParams = queryParams.concat('includeNotVisible=' + filters.includeNotVisible + '&')
        }
        if(filters?.sweetness?.length > 0) {
            queryParams = queryParams.concat('sweetness=' + filters?.sweetness + '&');
        }
        if(filters?.type?.length > 0) {
            queryParams = queryParams.concat('type=' + filters?.type + '&');
        }
        if(filters?.price?.min != null && filters?.price?.max != null) {
            queryParams = queryParams.concat('minPrice=' + filters?.price?.min + '&maxPrice=' + filters?.price?.max + '&')
        }

        return queryParams.length > 1
            ? queryParams.substr(0, queryParams.length - 1)
            : queryParams;
    }

    if(loaded) {
        return (
            <div className="wines">
                <Nav changeFilter={changeFilter} price={filters!.price} submit={submit}/>
                <Items filters={crateQueryParams(filters)}/>
            </div>
        );
    } else {
        return (
            <p>Загрузка.....</p>
        )
    }
}

export default Wines;