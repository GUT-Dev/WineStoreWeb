import './Wines.css';
import Items from "./items/Items";
import Nav from "./nav/Nav";
import {useCallback, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import axios from "axios";

export const sweetnessTypes = [ "EXTRA_DRY", "DRY", "MEDIUM", "SWEET", "VERY_SWEET" ];
export const wineTypes = [ "WHITE", "RED", "ROSE", "SPARKLING", "FORTIFIED" ];

const GET_MAX_PRICE = "http://localhost:8080/wine/max-price";
const GET_MIN_PRICE = "http://localhost:8080/wine/min-price";

const Wines = (props) => {
    let [loaded, setLoaded] = useState(false);
    let [filters, setFilters] = useState({
        sweetness: [],
        type: [],
        price: {
            min: null,
            max: null
        },
        hasDiscount: null,
        includeNotVisible: null
    });
    let searchByName = useSelector(state => state.searchByName);

    const load = useCallback(async () => {
        let minPrice = await axios.get(GET_MIN_PRICE)
            .then(r => r.data);
        let maxPrice = await axios.get(GET_MAX_PRICE)
            .then(r => r.data);
        setFilters({...filters, price: {min: minPrice, max: maxPrice}});
        setLoaded(true);
    }, [])

    useEffect(() => {
        load();
    }, [props])

    const submit = (value) => {
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

    const changeFilter = (param) => {
        if(param.checked) {
            addFilter(param.id)
        } else {
            removeFilter(param.id)
        }
    }

    const addFilter = (param) => {
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

    const removeFilter = (param) => {
        if (param === "discount") {
            setFilters(filters => {
                    return {
                        ...filters,
                        hasDiscount: null
                    }
                }
            )
        } else if (param === "includeNotVisible") {
            setFilters(filters => {
                return {
                    ...filters,
                    includeNotVisible: null
                }
            })
        } else if (sweetnessTypes.includes(param)) {
            let id = filters.sweetness.indexOf(param);
            filters.sweetness.splice(id, 1);
            setFilters(value => {
                return {
                    ...value,
                    sweetness: [...filters.sweetness]
                }
            })
        } else if (wineTypes.includes(param)) {
            let id = filters.type.indexOf(param);
            filters.type.splice(id, 1);
            setFilters(value => {
                return {
                    ...value,
                    type: [...filters.type]
                }
            })
        }
    }

    const crateQueryParams = (filters) => {
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
        if(filters.sweetness.length > 0) {
            queryParams = queryParams.concat('sweetness=' + filters.sweetness + '&');
        }
        if(filters.type.length > 0) {
            queryParams = queryParams.concat('type=' + filters.type + '&');
        }
        if(filters.price.min != null && filters.price.max != null) {
            queryParams = queryParams.concat('minPrice=' + filters.price.min + '&maxPrice=' + filters.price.max + '&')
        }

        return queryParams.length > 1
            ? queryParams.substr(0, queryParams.length - 1)
            : queryParams;
    }

    if(loaded) {
        return (
            <div className="wines">
                <Nav changeFilter={changeFilter} price={filters.price} submit={submit}/>
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