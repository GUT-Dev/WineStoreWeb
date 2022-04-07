import './Item.css';
import {Component} from "react";
import {Link} from "react-router-dom";

const ELEMENT_PATH = "/wine/"
const DEFAULT_IMG_URL = "https://skillz4kidzmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg"

export default class Item extends Component {
    constructor(props) {
        super(props);
        this.state = props.item
    }

    render() {
        function getImage(link) {
            return link != null ? link : DEFAULT_IMG_URL
        }

        return (
            <div className="item-box">
                <Link className="item" to={ELEMENT_PATH + this.state.id}>
                    <img className="item-img" src={getImage(this.state.img)} alt="wine icon" />
                    <div className="descriptions">
                        <h4 className="item-name">{this.state.name}</h4>
                        <p className="price">{this.state.price} грн</p>
                    </div>
                </Link>
                <button className="button">Додати в кошик</button>
            </div>
        );
    }
}