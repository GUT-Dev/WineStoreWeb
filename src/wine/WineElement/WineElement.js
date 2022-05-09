import './WineElement.css';
import axios from "axios";
import {Component} from "react";
import checkImg from "../../utils/DefaultImg";
import { convertType, convertSweetness } from '../../utils/StringConverter'

const BASE_PATH = "http://localhost:8080"
const ELEMENT_PATH = BASE_PATH + "/wine/"

export default class WineElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            error: null,
            isLoaded: false,
            item: []
        }
    }

    componentDidMount() {
        axios.get(ELEMENT_PATH + this.state.id)
            .then(res => res.data)
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        item: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    getPrice() {
        if (this.state.item.discount === 0) {
            return (
                <div className="price-container">
                    <h4 className="wine-price price">{this.state.item.price} грн.</h4>
                </div>);
        } else {
            return (
                <div className="price-container">
                    <h3 className="old-price"> {this.state.item.price}</h3>
                    <h4 className="wine-price sale">{this.state.item.priceWithSale} грн.</h4>
                </div>
            )
        }
    }

    render() {
        const {error, isLoaded, item} = this.state;
        if (error) {
            return (<p> Error {error.message}</p>)
        } else if (!isLoaded) {
            return (<p> Зaгрузка....</p>)
        } else {
            return (
                <div className="wine-element">
                    <div className="wine-element-item">
                        <div className="wine-img-container">
                            <img className="-wine-img" src={checkImg(item.img)} alt="wine logo"/>
                        </div>
                        <div className="descriptions">
                            <h3 id="wine-name" className="item-name">{item.name}</h3>
                            <p>Тип напою: {convertType(item.type)}</p>
                            <p>Бренд: {item.brand.name}</p>
                            <p>Країна: {item.land.name}</p>
                            <p>Солодкість: {convertSweetness(item.sweetness)}</p>
                            <p>Міцність: {item.strength}%</p>
                            <br/>
                                {this.getPrice()}
                        </div>
                    </div>
                    <div className="additional-info box">
                        <p>Регіон: {item.region}</p>
                        <p>Вміст цукру: {item.sugarAmount} гр/л</p>
                        <p>Опис: {item.descriptions}</p>
                    </div>
                </div>
            );
        }
    }
}