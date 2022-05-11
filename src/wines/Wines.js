import './Wines.css';
import Items from "./items/Items";
import Nav from "./nav/Nav";
import {useState} from "react";
import {useSelector} from "react-redux";

export const sweetnessTypes = [ "EXTRA_DRY", "DRY", "MEDIUM", "SWEET", "VERY_SWEET" ];
export const wineTypes = [ "WHITE", "RED", "ROSE", "SPARKLING", "FORTIFIED" ];

const Wines = () => {
    let [filters, setFilters] = useState({
        sweetness: [],
        type: [],
        price: {
            min: 0,
            max: 10000
        },
        hasDiscount: null
    });
    let searchByName = useSelector(state => state.searchByName);

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
        } else if (sweetnessTypes.includes(param)) {
            setFilters(filters => {
                return {
                    ...filters,
                    sweetness: [...filters.sweetness, param]
                }
            })
        } else {
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
        } else if (sweetnessTypes.includes(param)) {
            let id = filters.sweetness.indexOf(param);
            filters.sweetness.splice(id, 1);
            setFilters(value => {
                return {
                    ...value,
                    sweetness: [...filters.sweetness]
                }
            })
        } else {
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

    return (
        <div className="wines">
            <Nav changeFilter={changeFilter} price={filters.price} submit={submit}/>
            <Items filters={crateQueryParams(filters)}/>
        </div>
    );
}

export default Wines;