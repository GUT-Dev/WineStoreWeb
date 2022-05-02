import './Nav.css';
import {convertSweetness, convertType} from "../../util/StringConverter";
import {sweetnessTypes, wineTypes} from "../Wines";

const Nav = (props) => {
    const changeFilter = props.changeFilter;

    const sweetnessElement = (name, convertFunction) => {
        return (
            <div className="filter-item">
                <input onClick={name => changeFilter(name.target)} type="checkbox" id={name}/>
                <span>{convertFunction(name)}</span>
            </div>
        )
    }

    return (
        <div className="nav">
            <div className="filter-block">
                <h3 className="filter-header">Тип:</h3>
                {wineTypes.map(element =>
                        sweetnessElement(element, convertType))}
            </div>
            <div className="filter-block">
                <h3 className="filter-header">Вміст цукру:</h3>
                {sweetnessTypes.map(element =>
                    sweetnessElement(element, convertSweetness))}
            </div>
            <div className="filter-block">Price-filter</div>
        </div>
    );
}

export default Nav;