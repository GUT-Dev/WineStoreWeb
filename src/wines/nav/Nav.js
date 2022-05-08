import './Nav.css';
import {convertSweetness, convertType} from "../../utils/StringConverter";
import {sweetnessTypes, wineTypes} from "../Wines";
import {useState} from "react";

const Nav = (props) => {
    const changeFilter = props.changeFilter;
    const defaultPrice = props.price;
    let [price, setPrice] = useState(props.price);
    const step = {
        min: 10,
        max: 190,
        value: defaultPrice.max / 190
    }

    const sweetnessElement = (name, convertFunction) => {
        return (
            <div className="filter-item">
                <input onClick={name => changeFilter(name.target)} type="checkbox" id={name}/>
                <span>{convertFunction(name)}</span>
            </div>
        )
    }

    const handleChange = (event) => {
        if(event.target.id === "min") {
            setPrice(value => {
                return {
                    ...value,
                    min: event.target.value
                }
            })
        } else {
            setPrice(value => {
                return {
                    ...value,
                    max: event.target.value
                }
            })
        }
    }

    const onSubmit = () => {
        props.submit(price)
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

            <div className="range-filter">
                <h3 className="filter-header">Діапазон цін:</h3>
                {/*<div className="range-controls">*/}
                {/*    <div className="scale">*/}
                {/*        <div style={{marginLeft: price.min / step.value, width: (price.max  - price.min) / step.value}} className="nav-bar"/>*/}
                {/*    </div>*/}
                {/*    <div style={{left: price.min / step.value + 10}} className="toggle min-toggle"/>*/}
                {/*    <div style={{left: price.max / step.value + 10}} className="toggle max-toggle"/>*/}
                {/*</div>*/}
                <div className="price-controls">
                    від <input className="min-price nav-input"
                               type="number"
                               min={defaultPrice.min}
                               max={defaultPrice.max}
                               id="min"
                               value={price.min}
                               onChange={handleChange}/>
                    до <input className="max-price nav-input"
                              type="number"
                              min={defaultPrice.min}
                              max={defaultPrice.max}
                              id="max"
                              value={price.max}
                              onChange={handleChange}/>
                </div>
                <button className="nav-submit" type="submit" onClick={onSubmit}>Пошук</button>
            </div>
        </div>
    );
}

export default Nav;