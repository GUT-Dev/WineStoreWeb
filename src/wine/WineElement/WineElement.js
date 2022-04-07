import './WineElement.css';
import axios from "axios";
import {Component} from "react";

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

    render() {
        const {error, isLoaded, item} = this.state;
        if (error) {
            return (<p> Error {error.message}</p>)
        } else if (!isLoaded) {
            return (<p> Зфгрузка....</p>)
        } else {
            return (
                <div className="wine-element">
                    Вино
                    <div className="wine-element-item">
                        <img className="img" src={item.img} alt="wine logo"/>
                        <div className="descriptions">
                            <h3 id="wine-name" className="item-name">{item.name}</h3>
                            <p>Тип напою: {item.type}</p>
                            <p>Бренд: {item.brand.name}</p>
                            <p>Країна: {item.land.name}</p>
                            <p>Регіон: {item.region}</p>
                            <p>Солодкість: {item.sweetness}</p>
                            <p>Вміст цукру: {item.sugarAmount}</p>
                            <p>Алкоголь: {item.strength}</p>
                            <br/>
                            <h4 id="wine-price">Ціна: {item.price} грн.</h4>
                        </div>
                    </div>
                    <div className="additional-info">Опис: {item.descriptions}</div>
                </div>
            );
        }
    }
}