import './Wines.css';
import Items from "./items/Items";
import Nav from "./nav/Nav";
import {useState} from "react";

export const sweetnessTypes = [ "EXTRA_DRY", "DRY", "MEDIUM", "SWEET", "VERY_SWEET" ];
export const wineTypes = [ "WHITE", "RED", "ROSE", "SPARKLING", "FORTIFIED" ];

const Wines = () => {
    let [filters, setFilters] = useState({
        sweetness: [],
        type: [],
        price: {
            min: 0,
            max: 10000
        }
    });

    const changeFilter = (param) => {
        if(param.checked) {
            addFilter(param.id)
        } else {
            removeFilter(param.id)
        }
    }

    const addFilter = (param) => {
        if (sweetnessTypes.includes(param)) {
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
        if (sweetnessTypes.includes(param)) {
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
        let priceParam = 'minPrice=' + filters.price.min + '&maxPrice=' + filters.price.max;
        let sweetnessParam = null;
        let typeParam = null;

        if(filters.sweetness.length > 0) {
            sweetnessParam = '&sweetness=' + filters.sweetness;
        }

        if(filters.type.length > 0) {
            typeParam = '&type=' + filters.type;
        }

        if(sweetnessParam != null && typeParam != null) {
            return '?' + priceParam + sweetnessParam + typeParam
        } else if(sweetnessParam != null) {
            return '?' + priceParam + sweetnessParam
        } else if(typeParam != null) {
            return '?' + priceParam + typeParam
        } else {
            return '?' + priceParam
        }
    }

    return (
        <div className="wines">
            <Nav changeFilter={changeFilter}/>
            <Items filters={crateQueryParams(filters)}/>
        </div>
    );
}

export default Wines;