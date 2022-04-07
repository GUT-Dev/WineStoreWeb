import './Items.css';
import Item from "./item/Item";
import {Component} from "react";
import axios from "axios";

const BASE_PATH = "http://localhost:8080"
const ELEMENT_PATH = BASE_PATH + "/wine"

export default class Items extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            nav: []
        }
    }

    componentDidMount() {
        axios.get(ELEMENT_PATH)
            .then(res => res.data)
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
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
        const {error, isLoaded, items} = this.state;
        if (error) {
            return (<p> Error {error.message}</p>)
        } else if (!isLoaded) {
            return (<p> Зфгрузка....</p>)
        } else {
            return (
                <div className="items">
                    {items.map(item =>
                        <Item item={item} key={item.id}/>
                    )}
                </div>
            );
        }
    }
}